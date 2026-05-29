#!/usr/bin/env node

import { startup } from 'pgtyped-rescript-query';
import { AsyncQueue } from '@pgtyped/wire';
import chokidar from 'chokidar';
import nun from 'nunjucks';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { debug } from './util.js';
import { parseConfig, ParsedConfig, TransformConfig } from './config.js';
import { getMatchedFiles } from './glob.js';
import path from 'path';
import {
  DiagnosticsFormat,
  DiagnosticsMode,
  runDiagnostics,
} from './diagnostics.js';

import WorkerPool from 'piscina';

// tslint:disable:no-console

nun.configure({ autoescape: false });

interface TransformJob {
  files: string[];
  transform: TransformConfig;
}

class FileProcessor {
  private readonly pool: WorkerPool;
  public readonly workQueue: Promise<unknown>[] = [];
  private processedCount = 0;
  private skippedCount = 0;
  private recompiledCount = 0;
  private errorCount = 0;

  constructor(
    private readonly config: ParsedConfig,
    private readonly verboseOutput: boolean,
  ) {
    this.pool = new WorkerPool({
      filename: new URL('./worker.js', import.meta.url).href,
      maxThreads: 8,
      workerData: config,
    });
    if (this.verboseOutput) {
      console.log(`Using a pool of ${this.pool.threads.length} threads.`);
    }
  }

  public async shutdown() {
    await this.pool.destroy();
  }

  public printSummary() {
    if (this.verboseOutput) {
      console.log(
        `Summary: ${this.recompiledCount} recompiled, ${this.skippedCount} unchanged, ${this.errorCount} errors, ${this.processedCount} processed.`,
      );
      return;
    }

    if (this.recompiledCount === 0 && this.errorCount === 0) {
      console.log('No files recompiled.');
    }
  }

  public push(job: TransformJob) {
    this.workQueue.push(
      ...job.files.map(async (fileName) => {
        try {
          fileName = path.relative(process.cwd(), fileName);
          this.processedCount += 1;
          if (this.verboseOutput) {
            console.log(`Processing ${fileName}`);
          }
          const result = await this.pool.run({
            fileName,
            transform: job.transform,
          });
          if (result.skipped) {
            this.skippedCount += 1;
            if (this.verboseOutput) {
              console.log(
                `Skipped ${fileName}: no changes or no queries detected`,
              );
            }
          } else {
            this.recompiledCount += 1;
            console.log(
              `Saved ${result.typeDecsLength} query types from ${fileName} to ${result.relativePath}`,
            );
          }
        } catch (err) {
          if (err instanceof Error) {
            const isWorkerTermination =
              err.message === 'Terminating worker thread';
            if (isWorkerTermination) {
              return;
            }

            this.errorCount += 1;
            console.error(
              `Error processing file: ${err.stack || JSON.stringify(err)}`,
            );
          } else {
            this.errorCount += 1;
            console.error(`Error processing file: ${JSON.stringify(err)}`);
          }
          if (this.config.failOnError) {
            await this.pool.destroy();
            process.exit(1);
          }
        }
      }),
    );
  }
}

async function main(
  cfg: ParsedConfig | Promise<ParsedConfig>,
  // tslint:disable-next-line:no-shadowed-variable
  isWatchMode: boolean,
  // tslint:disable-next-line:no-shadowed-variable
  fileOverride?: string,
  verboseOutput = false,
) {
  const config = await cfg;
  const connection = new AsyncQueue();
  debug('starting codegenerator');
  await startup(config.db, connection);

  debug('connected to database %o', config.db.dbName);

  const fileProcessor = new FileProcessor(config, verboseOutput);
  let fileOverrideUsed = false;
  for (const transform of config.transforms) {
    const pattern = `${config.srcDir}/**/${transform.include}`;
    if (isWatchMode) {
      const cb = (filePath: string) => {
        fileProcessor.push({
          files: [filePath],
          transform,
        });
      };
      chokidar
        .watch(pattern, { persistent: true })
        .on('add', cb)
        .on('change', cb);
    } else {
      /**
       * If the user didn't provide the -f parameter, we're using the list of files we got from chokidar.
       * If he did, we're using the file list to detect if his provided file should be used with this transform.
       */
      let fileList = await getMatchedFiles(pattern);
      if (fileOverride) {
        fileList = fileList.includes(fileOverride) ? [fileOverride] : [];
        if (fileList.length > 0) {
          fileOverrideUsed = true;
        }
      }
      debug('found query files %o', fileList);
      const transformJob = {
        files: fileList,
        transform,
      };
      fileProcessor.push(transformJob);
    }
  }
  if (fileOverride && !fileOverrideUsed) {
    console.log(
      'File override specified, but file was not found in provided transforms',
    );
  }
  if (!isWatchMode) {
    await Promise.all(fileProcessor.workQueue);
    fileProcessor.printSummary();
    await fileProcessor.shutdown();
    process.exit(0);
  }
}

const args = yargs(hideBin(process.argv))
  .scriptName('pgtyped-rescript')
  .usage('$0 -c config.json [options]')
  .command(
    'diagnose <sqlFile>',
    'Run diagnostics for a named SQL query',
    (cmd) =>
      cmd
        .positional('sqlFile', {
          type: 'string',
          description: 'SQL file containing the query',
          demandOption: true,
        })
        .option('query', {
          alias: 'q',
          type: 'string',
          description: 'Named query to diagnose',
        })
        .option('mode', {
          alias: 'm',
          choices: ['describe', 'explain', 'analyze'] as const,
          default: 'explain' as const,
          description: 'Diagnostic mode to run',
        })
        .option('params', {
          alias: 'p',
          type: 'string',
          description: 'JSON object with query parameters',
        })
        .option('params-file', {
          type: 'string',
          description: 'Path to a JSON file with query parameters',
        })
        .option('format', {
          choices: ['text', 'table', 'json'] as const,
          default: 'text' as const,
          description: 'Output format for diagnostics',
        })
        .option('list', {
          type: 'boolean',
          description: 'List query names in the SQL file',
        })
        .option('sql', {
          type: 'boolean',
          description: 'Print the processed SQL without running diagnostics',
        })
        .option('timeout', {
          type: 'string',
          description:
            'Statement timeout for explain analyze, such as 500ms, 5s, or 1min',
        }),
  )
  .version()
  .env()
  .options({
    config: {
      alias: 'c',
      type: 'string',
      description: 'Config file path',
    },
    watch: {
      alias: 'w',
      description: 'Watch mode',
      type: 'boolean',
    },
    uri: {
      type: 'string',
      description: 'DB connection URI (overrides config)',
    },
    file: {
      alias: 'f',
      type: 'string',
      conflicts: 'watch',
      description: 'File path (process single file, incompatible with --watch)',
    },
    verbose: {
      alias: 'v',
      type: 'boolean',
      description: 'Show detailed processing output',
    },
  })
  .epilogue('For more information, find our manual at https://pgtyped.dev/')
  .parseSync();

const {
  watch: isWatchMode,
  file: fileOverride,
  config: configPath,
  uri: connectionUri,
  verbose,
} = args;
const command = args._[0];
const needsConfig =
  command !== 'diagnose' || (!(args.list as boolean) && !(args.sql as boolean));

if (needsConfig && typeof configPath !== 'string') {
  console.log('Config file required. See help -h for details.\nExiting.');
  process.exit(0);
}

if (isWatchMode && fileOverride) {
  console.log('File override is not compatible with watch mode.\nExiting.');
  process.exit(0);
}

try {
  const config =
    typeof configPath === 'string'
      ? parseConfig(configPath, connectionUri)
      : undefined;
  if (command === 'diagnose') {
    runDiagnostics(config, {
      file: args.sqlFile as string,
      queryName: args.query as string | undefined,
      params: args.params as string | undefined,
      paramsFile: args.paramsFile as string | undefined,
      mode: args.mode as DiagnosticsMode,
      format: args.format as DiagnosticsFormat,
      list: args.list as boolean | undefined,
      sql: args.sql as boolean | undefined,
      timeout: args.timeout as string | undefined,
    }).catch((e) => {
      console.error((e as Error).message);
      process.exitCode = 1;
    });
  } else {
    if (!config || typeof configPath !== 'string') {
      console.log('Config file required. See help -h for details.\nExiting.');
      process.exit(0);
    }

    chokidar.watch(configPath).on('change', () => {
      console.log('Config file changed. Exiting.');
      process.exit();
    });
    main(config, isWatchMode || false, fileOverride, verbose || false).catch(
      (e) => debug('error in main: %o', e.message),
    );
  }
} catch (e) {
  console.error('Failed to parse config file:');
  console.error((e as any).message);
  process.exit();
}
