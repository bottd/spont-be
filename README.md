# Spont BE
### About
This is the Node server for the Spont app written in React Native.  You can view the app's repo [here](https://github.com/gmasterofnone/spont). The server is written in Node with Typescript and uses GraphQL to serve up data from the PostgreSQL server.

### Installation and Setup

To set up the server locally follow these steps:

This project requires node to be installed.  Make sure you have the following global dependencies set up: Typescript, Ts-Node, Knex, & PostgreSQL

Install any missing global dependencies with the following command
`$ npm install -g typescript ts-node knex`
`$ brew install postgres`

After all globals are set up clone the repo down and install the modules

`$ git clone https://github.com/bottd/spont-be && cd spont-be`
`$ npm install`

Then create the database for the server named spont_dev and add the uuid-ossp extension to it

`$ psql -U postgres -c 'CREATE DATABASE spont_test;'`
`$ psql -U postgres spont_test -c 'create extension "uuid-ossp";'`

### Running the server

The server can be run with

`npm start`
This will expose the GraphQL dev tools endpoint at localhost:3000/graphql
The same endpoint can also take HTTP requests

To run the test suite
`npm test`
