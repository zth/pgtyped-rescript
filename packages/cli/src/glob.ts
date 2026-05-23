import chokidar from 'chokidar';

/** Uses chokidar to collect files matching a glob pattern. */
export function getMatchedFiles(pattern: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const files: string[] = [];
    let settled = false;

    const watcher = chokidar.watch(pattern, { persistent: false });

    const closeAndSettle = (
      settle: () => void,
      fallback: (error: unknown) => void,
    ) => {
      if (settled) {
        return;
      }
      settled = true;
      watcher.close().then(settle, fallback);
    };

    watcher.on('add', (filePath) => files.push(filePath));
    watcher.on('ready', () => {
      closeAndSettle(() => resolve(files), reject);
    });
    watcher.on('error', (error) => {
      closeAndSettle(() => reject(error), reject);
    });
  });
}
