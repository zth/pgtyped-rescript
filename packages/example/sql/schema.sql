CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  age INT,
  registration_date DATE NOT NULL DEFAULT CURRENT_DATE
);

COMMENT ON COLUMN users.age IS 'Age (in years)';

CREATE TYPE notification_type AS ENUM ('notification', 'reminder', 'deadline');
CREATE TYPE category AS ENUM ('thriller', 'science-fiction', 'novel');

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  payload jsonb NOT NULL,
  type notification_type NOT NULL DEFAULT 'notification',
  created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  rank INTEGER,
  name TEXT,
  author_id INTEGER REFERENCES authors,
  categories category[]
);

CREATE TABLE book_comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  book_id INTEGER REFERENCES books,
  body TEXT
);

CREATE TABLE dump(
  id SERIAL PRIMARY KEY,
  meta jsonb[],
  big_int bigint,
  
  -- Check constraints that SHOULD be supported
  some_string_enum text check (some_string_enum in ('FIRST', 'second', 'Third', 'fourth')),
  some_int_enum integer check (some_int_enum in (1, 2, 3, 4)),
  some_float_enum float check (some_float_enum in (1.5, 2.5, 3.5, 4.5)),
  status TEXT CHECK (status IN ('published', 'draft', 'archived')),
  format TEXT CHECK (format = ANY (ARRAY['hardcover'::text, 'paperback'::text, 'ebook'::text, 'audiobook'::text])),
  language TEXT CHECK (language IN ('en', 'es', 'fr', 'de')),
  page_count INTEGER CHECK (page_count IN (100, 200, 300, 400, 500)),
  priority INTEGER CHECK (priority = ANY (ARRAY[1, 2, 3, 4, 5])),
  price DECIMAL(10,2) CHECK (price IN (9.99, 19.99, 29.99, 39.99)),
  rating FLOAT CHECK (rating = ANY (ARRAY[1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0])),
  discount_rate FLOAT CHECK (discount_rate IN (0.05, 0.10, 0.15, 0.20, 0.25)),
  weight_kg FLOAT CHECK (weight_kg IN (0.1, 0.2, 0.5, 1.0, 1.5, 2.0)),
  binding_type TEXT CHECK (binding_type IN ('Hardcover', 'Paperback', 'SPIRAL', 'loose-leaf')),

  -- ! Check constraints that can't be supported right now
  -- Not meaningful to represent ranges in ReScript
  edition INTEGER CHECK (edition BETWEEN 1 AND 10),
  -- Mixed value type constraints
  availability TEXT CHECK (availability IN ('in-stock', 'limited', 'out-of-stock') OR availability = 'special-order'),
  -- Boolean-like constraints
  is_featured BOOLEAN CHECK (is_featured IN (true, false)),
  -- Range constraints with specific values
  publication_year INTEGER CHECK (publication_year IN (2020, 2021, 2022, 2023, 2024) OR publication_year BETWEEN 1900 AND 2030),
  -- Complex expressions
  isbn TEXT CHECK (length(isbn) = 13 AND isbn ~ '^[0-9]+$'),
  json_test jsonb
);

-- Commented out fields are already Postgres keywords
create table rescript_keywords_need_to_be_escaped(
  id SERIAL PRIMARY KEY,
  -- and text,
  -- as text,
  assert text,
  await text,
  -- constraint text,
  -- else text, 
  exception text,
  external text,
  -- false text,
  -- for text,  
  if text,
  -- in text,
  include text,
  let text,
  module text,
  mutable text,
  of text,
  open text,
  private text,
  rec text,
  switch text,
  -- true text,
  try text,
  type text,
  -- when text,
  while text
);

INSERT INTO users (email, user_name, first_name, last_name, age)
VALUES ('alex.doe@example.com', 'alexd', 'Alex', 'Doe', 35),
       ('jane.holmes@example.com', 'jane67', 'Jane', 'Holmes', 23),
       ('andrewjackson@example.com', 'ajack9', 'Andrew', 'Jackson', 19);

INSERT INTO notifications (user_id, payload)
VALUES (1, '{
  "message": "You have new frogs",
  "num_frogs": 2,
  "history": [
    {
      "event": "NewFrog",
      "timestamp": "2020-05-05T17:12:25+01:00"
    },
    {
      "event": "NewFrog",
      "timestamp": "2020-05-05T17:13:04+01:00"
    }
  ]
}');

INSERT INTO authors (first_name, last_name)
VALUES ('Nassim', 'Taleb'),
       ('Carl', 'Sagan'),
       ('Bertolt', 'Brecht');

INSERT INTO books (rank, name, author_id)
VALUES (1, 'Black Swan', 1),
       (4, 'The Dragons Of Eden', 2),
       (2, 'Mysteries of a Barbershop', 3),
       (3, 'In the Jungle of Cities', 3);

INSERT INTO book_comments (user_id, book_id, body)
VALUES (1, 1, 'Fantastic read, recommend it!'),
       (1, 2, 'Did not like it, expected much more...');

CREATE TYPE "Iso31661Alpha2" AS ENUM (
  'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF',
  'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG',
  'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC',
  'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL',
  'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN',
  'IQ', 'IR', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB',
  'LC', 'LI', 'LK', 'IO', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN',
  'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM',
  'MO', 'MP', 'MQ', 'MR', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO',
  'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV',
  'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM'
  -- Will sometime stay hanging when we add these countries
  --, 'TN', 'TO', 'TR', 'TT', 'TV'
);

CREATE TABLE book_country (
    id SERIAL PRIMARY KEY,
    country "Iso31661Alpha2" NOT NULL
);

INSERT INTO book_country (country)
VALUES ('CZ'), ('DE');
