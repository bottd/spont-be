import * as Knex from 'knex';

interface Location {
  location_name: string;
  latitude: number;
  longitude: number;
}

interface User {
  user_hash: string;
  visited: Array<number>;
}

exports.seed = async function(knex: Knex): Promise<any> {
  await knex('user_locations').del();
  await knex('users').del();
  await knex('locations').del();
  const locationIds = await Promise.all(
    mockLocations.map((location: Location) =>
      knex('locations').insert(location, 'id'),
    ),
  );
  const userIds = await Promise.all(
    mockUsers.map(async (user: User) => {
      const user_id = await knex('users').insert({ user_hash: user }, 'id');
      await Promise.all(
        user.visited.map((ind: number) =>
          knex('user_locations').insert({
            user_id: user_id[0],
            location_id: locationIds[ind][0],
            visit_count: 1,
          }, 'id'),
        ),
      );
    }),
  );

  return Promise.all(locationIds);
};

const mockLocations = [
  { location_name: 'A', latitude: 0, longitude: 0 },
  { location_name: 'B', latitude: 25, longitude: 2 },
  { location_name: 'C', latitude: 15, longitude: 23 },
  { location_name: 'D', latitude: 72, longitude: 57 },
  { location_name: 'E', latitude: 2, longitude: 10 },
  { location_name: 'F', latitude: 180, longitude: 15 },
];

const mockUsers = [
  { user_hash: 'USER1', visited: [0, 1] },
  { user_hash: 'USER2', visited: [1, 5] },
];
