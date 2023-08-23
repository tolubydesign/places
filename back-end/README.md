...
{title}
=================================

Purpose
-------
{...}

## Overview

{...}

### Technologies, Libraries and Tools
- {...}

## Usage

Run docker containers: `docker compose up`
Run server: `npm run serve`


## API Definition

```yml
URL: {{host}}/graphql
```
___
### Queries

__Get All Accounts Query:__
```graphql
query GetAllAccounts {
  getAllAccounts {
    id
    username
    name
    surname
    email
    account_type
  }
}
```
__Get All Accounts Response:__
```json
{
  "data": {
    "getAllAccounts": [
      {
        "id": "0fb1598a-4061-11ee-9eaf-0242ac130003",
        "username": "john",
        "name": "John",
        "surname": "Smith",
        "email": "john@john.com",
        "account_type": "admin"
      },
      ...
    ]
  }
}
```
___
__Get Account Query__
```graphql
query GetAccount($id: String!) {
  getAccount(id: $id) {
    id
    username
    name
    surname
    email
    account_type
  }
}
```
__Get Account Variables:__
```json
{
  "id": "f7abd8a2-3e9d-11ee-b68e-0242ac130004"
}
```
__Get Account Response:__
```json
{
  "data": {
    "getAccount": {
      "id": "0fb15c13-4061-11ee-9eaf-0242ac130003",
      "username": "jack",
      "name": "Jack",
      "surname": "Carber",
      "email": "jack@mail.com",
      "account_type": "user"
    }
  }
}
```
___
__Get Place Query__
```graphql
query GetAllPlaces {
  getAllPlaces {
    id
    name
    description
    location_type
    latitude
    longitude
    event_time
    event_type
    street
    city
    suburb
    country
    province
    code
  }
}
```
__Get Account Response:__
```json
{
  "data": {
    "getAllPlaces": [
      {
        "id": "0fb2b013-4061-11ee-9eaf-0242ac130003",
        "name": "number",
        "description": "des of number",
        "location_type": null,
        "latitude": "-25.708149",
        "longitude": "28.231654",
        "event_time": "1199138401000",
        "event_type": "private",
        "street": "451-523 32nd Ave",
        "city": "Pretoria",
        "suburb": "Villieria",
        "country": "South Africa",
        "province": "Gauteng",
        "code": "0186"
      },
      {
        "id": "0fb2b1c5-4061-11ee-9eaf-0242ac130003",
        "name": "un",
        "description": "open to talk",
        "location_type": null,
        "latitude": "-25.716777",
        "longitude": "28.234695",
        "event_time": "1199138401000",
        "event_type": "private",
        "street": "",
        "city": "",
        "suburb": "",
        "country": "South Africa",
        "province": "Gauteng",
        "code": ""
      },
      {...}
    ]
  }
}
```
___

___
### Mutations:

__Create Account Request:__
```
mutation CreateAccount($email: String!, $username: String!, $password: String!, $name: String, $surname: String) {
  createAccount(email: $email, username: $username, password: $password, name: $name, surname: $surname) {
    id
    username
  }
}
```
__Create Account Variables:__
```json
{
  "email": "dona@gmail.com",
  "username": "Danni",
  "password": "",
  "name": "Donna",
  "surname": "Monna"
}
```

__Create Account Response:__
```json
{
  "data": {
    "createAccount": {
      "id": "ebc86efb-4061-11ee-9eaf-0242ac130003",
      "username": "Danni"
    }
  }
}
```
___
__Create Account Request:__
```
mutation CreateAccount($email: String!, $username: String!, $password: String!, $name: String, $surname: String) {
  createAccount(email: $email, username: $username, password: $password, name: $name, surname: $surname) {
    id
    username
  }
}
```
__Create Account Variables:__
```json
{
  "email": "dona@gmail.com",
  "username": "Danni",
  "password": "",
  "name": "Donna",
  "surname": "Monna"
}
```

__Create Account Response:__
```json
{
  "data": {
    "createAccount": {
      "id": "ebc86efb-4061-11ee-9eaf-0242ac130003",
      "username": "Danni"
    }
  }
}
```
___

## TODO:
  + ~~Create `.sh` to easily work with docker mariadb~~
  + ~~Document findings on [Notion](https://www.notion.so/login)~~
  + ~~Connect and update docker container MariaDB~~
  + ~~Create Error class types like _ValidationError_ or _InternalServerError_~~
  + ~~Create `.sh` file to connect to database~~
  + Create users with different account levels. i.e. `Admin` OR `User`
  + Requests - add location event
    + REQUEST - get single location/places based on id
    + REQUEST - get all locations/places
  + ~~Requests - create user~~
  + Requests - delete user (should require admin user)
  + Requests - track users that are online and that are not online
  + Use JWT tokens
  + Requests - bookmark events
  + Document requests