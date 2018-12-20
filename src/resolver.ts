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
  location: async ({ id }) => {
    const location = await selectLocationByID(id);
    const users = await selectUsersByLocationID(id);
    return { ...location, users };
  },
  locations: () => database('locations').select(),
  newUser: () => createNewUser(),
};

function selectUserByID(id: string) {
  return database('users')
    .where('id', id)
    .first();
}

function selectLocationByID(id: string) {
  return database('locations')
    .where('id', id)
    .first();
}

async function selectLocationsByUserID(id: string) {
  const locationJoins = await database('user_locations')
    .where('user_id', id)
    .select();
  const locations = locationJoins.map(join =>
    selectLocationByID(join.location_id),
  );
  return Promise.all(locations);
}

async function selectUsersByLocationID(id: string) {
  const userJoins = await database('user_locations')
    .where('location_id', id)
    .select();
  const users = userJoins.map(join => selectUserByID(join.user_id));
  return Promise.all(users);
}
async function createNewUser() {
  const newUser = await database('users').insert({}, '*');
  return newUser[0];
}
