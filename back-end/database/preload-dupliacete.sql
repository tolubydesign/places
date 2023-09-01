-- DROP DATABASE IF EXISTS mariadatabase;
-- CREATE DATABASE mariadatabase;
USE mariadatabase;

drop table if exists link;
DROP TABLE IF EXISTS place;
DROP TABLE IF EXISTS bookmark;
DROP TABLE IF EXISTS bookmark_group;
DROP TABLE IF EXISTS account;

CREATE TABLE IF NOT EXISTS link (
  id BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  -- id CHAR(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT (UUID()),
  -- id UUID UNSIGNED NOT NULL DEFAULT UUID(),
  url VARCHAR (255) NOT NULL,
  name VARCHAR (255) NOT NULL,
  description VARCHAR (255),
  rel VARCHAR (50)
);

INSERT INTO link (url, name)
VALUES
 ('http://www.google.com','Google'),
 ('http://www.azure.microsoft.com','Azure'),
 ('http://www.codefresh.io','Codefresh');

-- Table
-- TODO: expand on user table requirements
CREATE TABLE IF NOT EXISTS account (
  -- id BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  id BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  -- id CHAR(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT (UUID()),
  -- id UUID UNSIGNED NOT NULL DEFAULT UUID(),
  username VARCHAR (100) NOT NULL,
  name TEXT,
  surname TEXT, 
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  account_type ENUM('admin', 'user') DEFAULT 'user',

  -- primary key(id)
  -- CONSTRAINT "user_pkey" PRIMARY KEY ("id")
) ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE account ADD PRIMARY KEY(id);

-- CreateIndex
-- CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

INSERT INTO account(username, password, email, name, surname, account_type)
VALUES
  ("john", "password", "john@john.com", "John", "Smith", "admin"),
  ("sam", "password", "sam@gmail.com", "Sam", "Fisher", "user"),
  ("jack", "password", "jack@mail.com", "Jack", "Carber", "user"),
  ("mark", "password", "mark@cmail.com", "Mark", "Wallberg", "user"),
  ("abbrem", "word", "ab@gmail.com", "Abb", "Abraham", "admin");

-- Table
CREATE TABLE IF NOT EXISTS place (
  id BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  -- id char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT (UUID()),
  -- id UUID UNSIGNED NOT NULL DEFAULT UUID(),
  name VARCHAR (255) NOT NULL,
  description VARCHAR (255) DEFAULT '',
  owner UUID NOT NULL,
  location_type VARCHAR(250),
  latitude Decimal(8,6),
  longitude DECIMAL(9, 6),
  -- https://www.mysqltutorial.org/mysql-timestamp.aspx
  event_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  event_type ENUM('open', 'private', 'invite required') DEFAULT 'open',
  street VARCHAR (255) NOT NULL,
  city VARCHAR (255) NOT NULL,
  suburb VARCHAR (255) NOT NULL,
  country VARCHAR (255) NOT NULL,
  province VARCHAR (255) NOT NULL,
  code VARCHAR (255) NOT NULL,

  -- PRIMARY KEY(id)
) ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE place ADD PRIMARY KEY(id);

-- Bookmarks
-- [How to store arrays in MySQL?](https://stackoverflow.com/questions/17371639/how-to-store-arrays-in-mysql)
-- [SQL function json-arrayagg](https://dev.mysql.com/doc/refman/5.7/en/aggregate-functions.html#function_json-arrayagg)
CREATE TABLE IF NOT EXISTS bookmark_group (
  id BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  -- id char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  -- id UUID UNSIGNED NOT NULL DEFAULT UUID() PRIMARY KEY,
  title VARCHAR (100) NOT NULL,
  description VARCHAR (255) NOT NULL,

  creator_id BINARY(16) NOT NULL,
  bookmark_id BINARY(16) NOT NULL,
  -- creator_id UUID UNSIGNED NOT NULL,
  -- bookmark_id UUID UNSIGNED NOT NULL

  -- bookmark_group__creator_id__fk
  CONSTRAINT `fk_bookmark_group_account` FOREIGN KEY (creator_id) REFERENCES account(id),
  -- bookmark_group__bookmark_id__fk
  CONSTRAINT `fk_bookmark_group_bookmark` FOREIGN KEY (bookmark_id) REFERENCES bookmark(bookmark_group_id)
) ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE bookmark_group ADD PRIMARY KEY(id);

CREATE TABLE IF NOT EXISTS bookmark (
  id BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  -- id char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  -- id UUID UNSIGNED NOT NULL DEFAULT UUID() PRIMARY KEY,
  location_id BINARY(16) NOT NULL,
  bookmark_group_id BINARY(16) NOT NULL,
  -- location_id UUID UNSIGNED NOT NULL,
  -- bookmark_group_id UUID NOT NULL,

  -- Reference resource "Foreign key and references": https://stackoverflow.com/questions/17371639/how-to-store-arrays-in-mysql
  -- CONSTRAINT "bookmark__group__fk" FOREIGN KEY ("bookmark_group_id") REFERENCES "bookmark_group"(id),
  -- CONSTRAINT "bookmark__place__fk" FOREIGN KEY ("location_id") REFERENCES "place"(id)
  CONSTRAINT `fk_bookmark_location` FOREIGN KEY (location_id) REFERENCES place(id),

  -- CONSTRAINT `fk_bookmark_creator`
  --   FOREIGN KEY (creator_id) REFERENCES account (id),
  -- CONSTRAINT `fk_location_reference`
  --   FOREIGN KEY (location_id) REFERENCES place (id),
  -- FOREIGN KEY (group) REFERENCES bookmark_group (id)
) ENGINE = InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE bookmark ADD PRIMARY KEY(id);

INSERT INTO place(name, description, location_type, latitude, longitude, event_time, event_type, street, suburb, city, province, country, code)
VALUES
  ("number", "des of number", null, -25.708149, 28.231654, '2008-01-01 00:00:01', 'private', '451-523 32nd Ave', 'Villieria', 'Pretoria', 'Gauteng', 'South Africa', '0186'),
  ("un", "open to talk", null, -25.716777, 28.234695, '2008-01-01 00:00:01', 'private', '', '', '', 'Gauteng', 'South Africa', ''),
  ("bella", "les mos", null, -25.720521, 28.217332, '2008-01-01 00:00:01', 'private', '', '', '', 'Gauteng', 'South Africa', ''),
  ("part", "omni", null, -25.793195, 28.142308, '2008-01-01 00:00:01', 'private', 'Piet Retief Rd', 'Thaba Tshwane', 'Centurion', 'Gauteng', 'South Africa', '0187');

-- ==========================================================================================================================

-- DROP DATABASE IF EXISTS mariadatabase;
-- CREATE DATABASE mariadatabase;
USE mariadatabase;

drop table if exists link;
DROP TABLE IF EXISTS place;
DROP TABLE IF EXISTS bookmark;
DROP TABLE IF EXISTS bookmark_group;
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS fruits;
DROP TABLE IF EXISTS person_fruit;

-- Using UUID as primary key in MySQL/MariaDB databases - https://www.developerfiles.com/using-uuid-as-primary-key-in-mysqlmariadb-databases

-- Table
CREATE TABLE IF NOT EXISTS link (
  id UUID NOT NULL DEFAULT UUID(),
  -- id BINARY(16) NOT NULL DEFAULT UNHEX(REPLACE(UUID(),'-','')),
  -- id BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(, TRUE)),
  -- id CHAR(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT (UUID()),
  -- id UUID UNSIGNED NOT NULL DEFAULT UUID(),
  url VARCHAR (255) NOT NULL,
  name VARCHAR (255) NOT NULL,
  description VARCHAR (255),
  rel VARCHAR (50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table
INSERT INTO link (url, name)
VALUES
 ('http://www.google.com','Google'),
 ('http://www.azure.microsoft.com','Azure'),
 ('http://www.codefresh.io','Codefresh');

-- Table
CREATE TABLE IF NOT EXISTS account (
  id UUID NOT NULL DEFAULT UUID(),
  -- id BINARY(16) NOT NULL DEFAULT UNHEX(REPLACE(UUID(),'-','')),
  -- id BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  -- id CHAR(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT (UUID()),
  -- id UUID UNSIGNED NOT NULL DEFAULT UUID(),
  username VARCHAR (100) NOT NULL,
  name TEXT,
  surname TEXT, 
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  account_type ENUM('admin', 'user') DEFAULT 'user',

  PRIMARY KEY(id)
  -- CONSTRAINT "user_pkey" PRIMARY KEY ("id")
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
-- ALTER TABLE account ADD PRIMARY KEY(id);

-- CreateIndex
-- CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

INSERT INTO account(username, password, email, name, surname, account_type)
VALUES
  ("john", "password", "john@john.com", "John", "Smith", "admin"),
  ("sam", "password", "sam@gmail.com", "Sam", "Fisher", "user"),
  ("jack", "password", "jack@mail.com", "Jack", "Carber", "user"),
  ("mark", "password", "mark@cmail.com", "Mark", "Wallberg", "user"),
  ("abbrem", "word", "ab@gmail.com", "Abb", "Abraham", "admin");

-- Table
CREATE TABLE IF NOT EXISTS place (
  id UUID NOT NULL DEFAULT UUID(),
  -- id BINARY(16) NOT NULL DEFAULT UNHEX(REPLACE(UUID(),'-','')),
  -- id BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  -- id char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT (UUID()),
  -- id UUID UNSIGNED NOT NULL DEFAULT UUID(),
  name VARCHAR (255) NOT NULL,
  description VARCHAR (255) DEFAULT '',
  owner UUID,
  location_type VARCHAR(250),
  latitude Decimal(8,6),
  longitude DECIMAL(9, 6),
  -- https://www.mysqltutorial.org/mysql-timestamp.aspx
  event_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  event_type ENUM('open', 'private', 'invite required') DEFAULT 'open',
  street VARCHAR (255) NOT NULL,
  city VARCHAR (255) NOT NULL,
  suburb VARCHAR (255) NOT NULL,
  country VARCHAR (255) NOT NULL,
  province VARCHAR (255) NOT NULL,
  code VARCHAR (255) NOT NULL,

  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table
CREATE TABLE person (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table
CREATE TABLE fruits (
  fruit_name VARCHAR(20) NOT NULL PRIMARY KEY,
  colour VARCHAR(20),
  price INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table
CREATE TABLE person_fruit (
  person_id INT NOT NULL,
  fruit_name VARCHAR(20) NOT NULL,
  PRIMARY KEY(person_id, fruit_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Bookmarks
-- [How to store arrays in MySQL?](https://stackoverflow.com/questions/17371639/how-to-store-arrays-in-mysql)
-- [SQL function json-arrayagg](https://dev.mysql.com/doc/refman/5.7/en/aggregate-functions.html#function_json-arrayagg)
CREATE TABLE IF NOT EXISTS bookmark_group (
  id UUID NOT NULL DEFAULT UUID(),
  -- id BINARY(16) NOT NULL DEFAULT UNHEX(REPLACE(UUID(),'-','')),
  -- id BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  -- id char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  -- id UUID UNSIGNED NOT NULL DEFAULT UUID() PRIMARY KEY,
  title VARCHAR (100) NOT NULL,
  description VARCHAR (255) NOT NULL,

  creator_id BINARY(16) NOT NULL,
  bookmark_id BINARY(16) NOT NULL,
  -- creator_id UUID UNSIGNED NOT NULL,
  -- bookmark_id UUID UNSIGNED NOT NULL

  PRIMARY KEY(id)
  -- bookmark_group__creator_id__fk
  -- CONSTRAINT `fk_bookmark_group_account` FOREIGN KEY (creator_id) REFERENCES account(id),
  -- bookmark_group__bookmark_id__fk
  -- CONSTRAINT `fk_bookmark_group_bookmark` FOREIGN KEY (bookmark_id) REFERENCES bookmark(bookmark_group_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS bookmark (
  id UUID NOT NULL DEFAULT UUID(),
  -- id BINARY(16) NOT NULL DEFAULT UNHEX(REPLACE(UUID(),'-','')),
  -- id BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  -- id char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  -- id UUID UNSIGNED NOT NULL DEFAULT UUID() PRIMARY KEY,
  location_id BINARY(16) NOT NULL,
  bookmark_group_id BINARY(16) NOT NULL,
  -- location_id UUID UNSIGNED NOT NULL,
  -- bookmark_group_id UUID NOT NULL,

  PRIMARY KEY(id)
  -- Reference resource "Foreign key and references": https://stackoverflow.com/questions/17371639/how-to-store-arrays-in-mysql
  -- CONSTRAINT "bookmark__group__fk" FOREIGN KEY ("bookmark_group_id") REFERENCES "bookmark_group"(id),
  -- CONSTRAINT "bookmark__place__fk" FOREIGN KEY ("location_id") REFERENCES "place"(id)
  -- CONSTRAINT `fk_bookmark_location` FOREIGN KEY (location_id) REFERENCES place(id),

  -- CONSTRAINT `fk_bookmark_creator`
  --   FOREIGN KEY (creator_id) REFERENCES account (id),
  -- CONSTRAINT `fk_location_reference`
  --   FOREIGN KEY (location_id) REFERENCES place (id),
  -- FOREIGN KEY (group) REFERENCES bookmark_group (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO place(name, description, location_type, latitude, longitude, event_time, event_type, street, suburb, city, province, country, code)
VALUES
  ("number", "des of number", null, -25.708149, 28.231654, '2008-01-01 00:00:01', 'private', '451-523 32nd Ave', 'Villieria', 'Pretoria', 'Gauteng', 'South Africa', '0186'),
  ("un", "open to talk", null, -25.716777, 28.234695, '2008-01-01 00:00:01', 'private', '', '', '', 'Gauteng', 'South Africa', ''),
  ("bella", "les mos", null, -25.720521, 28.217332, '2008-01-01 00:00:01', 'private', '', '', '', 'Gauteng', 'South Africa', ''),
  ("part", "omni", null, -25.793195, 28.142308, '2008-01-01 00:00:01', 'private', 'Piet Retief Rd', 'Thaba Tshwane', 'Centurion', 'Gauteng', 'South Africa', '0187');

-- ALTER TABLE bookmark ADD PRIMARY KEY(id);
-- ALTER TABLE bookmark_group ADD PRIMARY KEY(id);
-- ALTER TABLE place ADD PRIMARY KEY(id);
