import * as knex from 'knex';
const axios = require('axios');
const environment = process.env.NODE_ENV || 'development';
const config = require('../../knexfile')[environment];
const database = knex(config);

interface Location {
  location_name: string;
  category: string;
  latitude: number;
  longitude: number;
}

interface User {
  id: string;
}

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

export async function insertLocation(location: Location, user: User) {
  const checkLocation = await database('locations')
    .where('latitude', location.latitude)
    .andWhere('longitude', location.longitude)
    .first();
  if (!checkLocation) {
    const locationID = await database('locations').insert(location, 'id');
    await database('user_locations').insert(
      {
        location_id: locationID[0],
        user_id: user.id,
        visit_count: 1,
      },
      '*',
    );
  } else {
    const selectedLocation = await database('locations')
      .where('latitude', location.latitude)
      .andWhere('longitude', location.longitude)
      .first();
    await database('user_locations')
      .where('location_id', selectedLocation.id)
      .andWhere('user_id', user.id)
      .increment('visit_count', 1);
  }
  const returnStuff = {
    userID: user.id,
    latitude: location.latitude,
    longitude: location.longitude,
  };
  return returnStuff;
}

export async function getLocationByCoords(latitude: number, longitude: number) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${
      process.env.API_KEY
    }&location=${latitude},${longitude}&rankby=distance`,
  );
  return response.data.results.map(result => ({
    category: result.types[0],
    location_name: result.name,
    latitude: result.geometry.location.lat,
    longitude: result.geometry.location.lng,
  }));
}
