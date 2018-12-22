import * as knex from 'knex';
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];
const database = knex(config);

export function selectUserByID(id: string) {
  return database('users')
    .where('id', id)
    .first();
}

export function selectLocationByID(id: string) {
  return database('locations')
    .where('id', id)
    .first();
}

export async function selectLocationsByUserID(id: string) {
  const locationJoins = await database('user_locations')
    .where('user_id', id)
    .select();
  const locations = locationJoins.map(join =>
    selectLocationByID(join.location_id),
  );
  return Promise.all(locations);
}

export async function selectUsersByLocationID(id: string) {
  const userJoins = await database('user_locations')
    .where('location_id', id)
    .select();
  const users = userJoins.map(join => selectUserByID(join.user_id));
  return Promise.all(users);
}
export async function createNewUser() {
  const newUser = await database('users').insert({}, '*');
  return newUser[0];
}
