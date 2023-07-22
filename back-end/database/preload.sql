-- Preload data (mysql)
-- https://github.com/codefresh-contrib/preload-db-integration-tests
-- https://codefresh.io/docs/docs/example-catalog/ci-examples/populate-a-database-with-existing-data/
-- https://stackoverflow.com/questions/64110948/docker-compose-mariadb-with-adminer
-- https://www.beekeeperstudio.io/blog/how-to-use-mariadb-with-docker


-- $ sudo mariadb -u root < $PWD/database/preload.sql
-- $ sudo mariadb -u root --database=mysql < $PWD/database/preload.sql

-- Import database into mariadb
-- $ $PWD/database/preload.sql

-- install gen_random_uuid()
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP DATABASE IF EXISTS mariadatabase;

CREATE DATABASE mariadatabase;
USE mariadatabase;

drop table if exists
  link,
  user,
  place;

CREATE TABLE IF NOT EXISTS link (
  id UUID NOT NULL DEFAULT UUID(),
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
  id UUID NOT NULL DEFAULT UUID(),
  username VARCHAR (100) NOT NULL ,
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,

  primary key(id)
  -- CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
-- CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

INSERT INTO account(username, password, email)
VALUES
  ("john", "password", "john@john.com"),
  ("sam", "password", "sam@gmail.com"),
  ("jack", "password", "jack@mail.com"),
  ("mark", "password", "mark@cmail.com");

-- Table
CREATE TABLE IF NOT EXISTS place (
  id UUID NOT NULL DEFAULT UUID(),
  name VARCHAR (255) NOT NULL,
  description VARCHAR (255) DEFAULT '',
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
);

INSERT INTO place(name, description, location_type, latitude, longitude, event_time, event_type, street, suburb, city, province, country, code)
VALUES
  ("number", "des of number", null, -25.708149, 28.231654, '2008-01-01 00:00:01', 'private', '451-523 32nd Ave', 'Villieria', 'Pretoria', 'Gauteng', 'South Africa', '0186'),
  ("un", "open to talk", null, -25.716777, 28.234695, '2008-01-01 00:00:01', 'private', '', '', '', 'Gauteng', 'South Africa', ''),
  ("bella", "les mos", null, -25.720521, 28.217332, '2008-01-01 00:00:01', 'private', '', '', '', 'Gauteng', 'South Africa', ''),
  ("part", "omni", null, -25.793195, 28.142308, '2008-01-01 00:00:01', 'private', 'Piet Retief Rd', 'Thaba Tshwane', 'Centurion', 'Gauteng', 'South Africa', '0187');
