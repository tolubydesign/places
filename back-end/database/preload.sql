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
  username VARCHAR (100) NOT NULL,
  name TEXT,
  surname TEXT, 
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  account_type ENUM('admin', 'user') DEFAULT 'user',

  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  owner UUID, -- should be `NOT NULL` 
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

-- Bookmarks
-- [How to store arrays in MySQL?](https://stackoverflow.com/questions/17371639/how-to-store-arrays-in-mysql)
-- [SQL function json-arrayagg](https://dev.mysql.com/doc/refman/5.7/en/aggregate-functions.html#function_json-arrayagg)
CREATE TABLE IF NOT EXISTS bookmark_group (
  id UUID NOT NULL DEFAULT UUID() UNIQUE,
  title VARCHAR (100) NOT NULL,
  description VARCHAR (255) NOT NULL,
  creator_id UUID NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- bookmarks JSON,
  -- validation (JSON_VALID(bookmarks))

  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS bookmark (
  id UUID NOT NULL DEFAULT UUID() UNIQUE,
  creator_id UUID NOT NULL,
  location_id UUID NOT NULL,
  parent_group UUID NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO place(name, description, location_type, latitude, longitude, event_time, event_type, street, suburb, city, province, country, code)
VALUES
  ("number", "des of number", null, -25.708149, 28.231654, '2008-01-01 00:00:01', 'private', '451-523 32nd Ave', 'Villieria', 'Pretoria', 'Gauteng', 'South Africa', '0186'),
  ("un", "open to talk", null, -25.716777, 28.234695, '2008-01-01 00:00:01', 'private', '', '', '', 'Gauteng', 'South Africa', ''),
  ("bella", "les mos", null, -25.720521, 28.217332, '2008-01-01 00:00:01', 'private', '', '', '', 'Gauteng', 'South Africa', ''),
  ("part", "omni", null, -25.793195, 28.142308, '2008-01-01 00:00:01', 'private', 'Piet Retief Rd', 'Thaba Tshwane', 'Centurion', 'Gauteng', 'South Africa', '0187');

-- //=

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