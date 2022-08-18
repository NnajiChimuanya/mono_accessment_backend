## Live Demo

### https://mono-backend-accessement.herokuapp.com/

## Getting Started with this project

### Clone git repository

#### `git clone https://github.com/NnajiChimuanya/mono_accessment_backend.git`

## Requirements

### Nodejs version 10 or above

## installation

### `npm install`

## Run build

### `npm run build`

## Start development server

### `npm start`

#

# API Endpoints

## Login

### POST : `/auth/login`

### headers

        Content-Type : application/json

### body

    {
      email,
      password
    }

## Signup

### POST : `/auth/signup`

### headers

       {
         Content-Type : application/json
       }

### body

    {
      email,
      password,
      firstName,
      lastName
    }

## Get Account Deetails

### POST : `/code/:auth`

### headers

    {
        "Content-Type": "application/json",
        "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
    },

## Get Transactions

### POST : `/code/transaction/:id`

### headers

    {

        "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
    },

## Unlink

### POST : `/code/unlink/:id`

### headers

    {

        "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
    },

## Get Statement

### GET : `/code/statement/:id`

### headers

    {

        "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
    },

## Get Expenses

### GET : `/code/expenses/:id`

### headers

    {

        "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
    },

## Get Expenses

### GET : `/code/wallets/:id`

### headers

    {

        "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
    },

## Get Wallet Balance

### GET : `/code/wallets/:_id`

### headers

    {

        "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
    },

## Get Shareholders

### GET : `/code/shareholders/:_id`

### headers

    {

        "mono-sec-key": "test_sk_EWhGo3D4muvGL47S3e2l",
    },
