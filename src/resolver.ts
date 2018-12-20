import * as knex from 'knex';
const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = knex(config);

export const rootValue = {
  user: async ({ id }) => {
    const locations = await selectLocationsByUserID(id);
    const user = await selectUserByID(id);
    return { ...user, locations };
  },
  locations: () => database('locations').select(),
  newUser: () => createNewUser(),
};

function selectUserByID(id) {
  return database('users')
    .where('id', id)
    .first();
}

function selectLocationByID(id) {
  return database('locations')
    .where('id', id)
    .first();
}

async function selectLocationsByUserID(id) {
  const locationJoins = await database('user_locations')
    .where('user_id', id)
    .select();
  const locations = locationJoins.map(join =>
    selectLocationByID(join.location_id),
  );
  return Promise.all(locations);
}

async function createNewUser() {
  const newUser = await database('users').insert({}, '*');
  return newUser[0]
}

// function selectUsersByLocationID(id) {
//   return database('locations').where('id', id).first();
// }
