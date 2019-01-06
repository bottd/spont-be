import * as knex from 'knex';
const axios = require('axios');
const environment = process.env.NODE_ENV || 'development';
const config = require('../../knexfile')[environment];
const database = knex(config);

interface Location {
  id: string;
  location_name: string;
  category: string;
  latitude: number;
  longitude: number;
}

interface User {
  id: string;
}

export function selectAllLocations() {
  return database('locations').select();
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

export async function selectUserSuggestions(id: string) {
  const allowedCategories = ['store', 'gym', 'bar', 'cafe', 'restaurant'];
  const locations: any = await selectLocationsByUserID(id);
  const locationIds = locations.map(location => location.id);
  const suggestionIds: any = [];
  return locations.reduce(async (reccomend: any, location: Location) => {
    reccomend = await reccomend;
    const users: any = await selectUsersByLocationID(location.id);
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].id !== id) {
        let userLocations: any = await selectLocationsByUserID(users[i].id);
        userLocations = userLocations.filter(location =>
          allowedCategories.includes(location.category),
        );
        for (let k = 0; k < userLocations.length; k += 1) {
          if (
            !locationIds.includes(userLocations[k].id) &&
            !suggestionIds.includes(userLocations[k].id)
          ) {
            suggestionIds.push(userLocations[k].id);
            reccomend.push(userLocations[k]);
          }
        }
      }
    }
    return reccomend;
  }, []);
}

export async function createNewUser() {
  const newUser = await database('users').insert({}, '*');
  return newUser[0];
}

export async function insertLocation(location: Location, user: User) {
  let locationID;
  const checkLocation = await database('locations')
    .where('latitude', location.latitude)
    .andWhere('longitude', location.longitude)
    .first();
  if (!checkLocation) {
    locationID = await database('locations').insert(location, 'id');
  } else {
    locationID = checkLocation.id;
  }
  const checkJoin = await database('user_locations')
    .where('location_id', locationID)
    .andWhere('user_id', user.id)
    .first();
  if (checkJoin) {
    await database('user_locations')
      .where('location_id', locationID)
      .andWhere('user_id', user.id)
      .increment('visit_count', 1);
  } else {
    await database('user_locations').insert(
      {
        location_id: locationID,
        user_id: user.id,
        visit_count: 1,
      },
      '*',
    );
  }

  return {
    userID: user.id,
    latitude: location.latitude,
    longitude: location.longitude,
  };
}

export async function getLocationByCoords(latitude: number, longitude: number) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${
      process.env.API_KEY
    }&location=${latitude},${longitude}&rankby=distance`,
  );
  return response.data.results.reduce((array, result) => {
    if (!result.types.includes('route')) {
      let category = result.types[0];
      if (category.includes('store')) {
        category = 'store';
      }
      array.push({
        location_name: result.name,
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        category,
      });
    }
    return array;
  }, []);
}
