# instaql

<!-- [![Build Status](https://travis-ci.org/instaql/instaql.svg?branch=master)](https://travis-ci.org/instaql/instaql) -->

Create high-performance APIs with GraphQL and Postgres

## introduction

Create PostgreSQL sql code quickly and in a streamlined, versioned workflow.

`instaql` is a wrapper around `sqitch` to enable a sane workflow for sane database management.

* write and deploy extensions that can be installed with `CREATE EXTENSION`
* optionally deploy same source as `sqitch` modules (since some managed db providers don't allow custom extensions)
* write/deploy a project full of many `sqitch` modules that cross-reference each other using dependency resolution for running deploy command in proper order, etc
* pulling modules down (currently via npm) to make re-usability super easy

![instaql](/instaql.gif?raw=true "instaql in Action")

## installation

#### Install `psql`

Install `psql` without actually running the database. On mac you can use

`brew install libpq`

Or you can install the full-blown postgres locally, but it is recommended that you shut the service down. You'll be using `psql` to connect to the postgres that runs inside of a docker container.

#### Install sqitch

https://sqitch.org/
mac users can use brew: https://github.com/sqitchers/homebrew-sqitch

#### Install the Template library from http://www.tt2.org/

```sh
sudo cpan Template
```

#### Install `instaql` globally

```sh
npm install -g @instaql/cli
```

#### Get the verification utils

https://github.com/pyramation/pg-utils

## getting started

Initialize a project

```sh
instaql init --bare
instaql install
```

Now you should have a `packages/` folder

```sh
cd packages/
mkdir myfirstmodule
cd myfirstmodule/
instaql init
```

Now you can create some `sql` using `sqitch`!

```sh
instaql generate schema
instaql generate table
```

Deploy recursively, using all the required modules!

```sh
instaql deploy --createdb --recursive
```

## testing

To create a test, first cd into a sqitch module

```sh
cd packages/myfirstmodule
instaql maketest
```

Then you can use `jest` via `yarn` to test your logic.

```sh
yarn test:watch
```

## what's different

* interactive shell
* naming conventions
* utility functions to create verify/revert functions for most types
* bundled with templates for most common things:

```
column
extension
fixture
foreignKey
fullPolicy
grantAllTables
grantExecute
grantRole
grantSchema
grantTable
index
policy
procedure
role
rowLevelSecurity
schema
table
timestamps
trigger
type
uniqueIndex
utility
view
```

## bundle an npm module

You can install an npm module and then bundle it for `plv8`

```sh
yarn add my-awesome-npm-module
instaql bundle my-awesome-npm-module awesomeThing
```

## Install some existing packages

```sh
instaql install skitch-extension-verify
instaql install skitch-extension-jobs
```
