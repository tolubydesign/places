-- DROP DATABASE IF EXISTS mariadatabase;
-- CREATE DATABASE mariadatabase;
USE mariadatabase;

drop table if exists
  link,
  user,
  place;
DROP TABLE IF EXISTS bookmark;
DROP TABLE IF EXISTS account;

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
  username VARCHAR (100) NOT NULL,
  name TEXT,
  surname TEXT, 
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  account_type ENUM('admin', 'user') DEFAULT 'user',

  primary key(id)
  -- CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

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
);


-- Bookmarks
CREATE TABLE IF NOT EXISTS bookmark (
  id UUID NOT NULL DEFAULT UUID(),
  name TEXT,
  information TEXT,

  -- Reference resource "Foreign key and references": https://stackoverflow.com/questions/17371639/how-to-store-arrays-in-mysql
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES account (id)
);

INSERT INTO place(name, description, location_type, latitude, longitude, event_time, event_type, street, suburb, city, province, country, code)
VALUES
  ("number", "des of number", null, -25.708149, 28.231654, '2008-01-01 00:00:01', 'private', '451-523 32nd Ave', 'Villieria', 'Pretoria', 'Gauteng', 'South Africa', '0186'),
  ("un", "open to talk", null, -25.716777, 28.234695, '2008-01-01 00:00:01', 'private', '', '', '', 'Gauteng', 'South Africa', ''),
  ("bella", "les mos", null, -25.720521, 28.217332, '2008-01-01 00:00:01', 'private', '', '', '', 'Gauteng', 'South Africa', ''),
  ("part", "omni", null, -25.793195, 28.142308, '2008-01-01 00:00:01', 'private', 'Piet Retief Rd', 'Thaba Tshwane', 'Centurion', 'Gauteng', 'South Africa', '0187');
