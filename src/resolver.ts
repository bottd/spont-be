import * as knex from 'knex';
const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = knex(config);

export const rootValue = {
  users: () => database('users').select(),
};
