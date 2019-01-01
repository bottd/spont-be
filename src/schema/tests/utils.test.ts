import * as knex from 'knex';
import * as utils from '../utils';
const environment = process.env.NODE_ENV || 'development';
const config = require('../../../knexfile')[environment];
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

describe('utils methods', () => {
  it('Should match snapshot', () => {
    expect(utils).toMatchSnapshot();
  });

  describe('selectAllLocations', () => {
    beforeAll(async done => {
      await database.migrate.rollback();
      await database.migrate.latest();
      await database.seed.run();
      done();
    });
    it('should return all locations in locations table', async done => {
      const result = await utils.selectAllLocations();
      expect(result.length).toBe(6);
      done();
    });
  });

  describe('selectUserByID', () => {
    beforeAll(async done => {
      await database.migrate.rollback();
      await database.migrate.latest();
      await database.seed.run();
      done();
    });
    it('Should return a user object matching given ID', async done => {
      const users = await database('users').select();
      const selectedUser = await utils.selectUserByID(users[0].id);
      expect(selectedUser).toEqual(users[0]);
      done();
    });
  });

  describe('selectLocationByID', () => {
    beforeAll(async done => {
      await database.migrate.rollback();
      await database.migrate.latest();
      await database.seed.run();
      done();
    });
    it('Should return a location object matching the given ID', async done => {
      const locations = await utils.selectAllLocations();
      const selectedLocation = await utils.selectLocationByID(locations[0].id);
      expect(selectedLocation).toEqual(locations[0]);
      done();
    });
  });

  describe('selectLocationsByUserID', () => {
    beforeAll(async done => {
      await database.migrate.rollback();
      await database.migrate.latest();
      await database.seed.run();
      done();
    });

    it('Should return a set of locations associated with a user id', async done => {
      const users = await database('users').select();
      const userLocations = await utils.selectLocationsByUserID(users[0].id);
      const locations = userLocations.map((location: Location) => ({
        category: location.category,
        location_name: location.location_name,
        latitude: location.latitude,
        longitude: location.longitude,
      }));
      expect(locations.length).toBe(2);
      done();
    });
  });

  describe('selectUsersByLocationID', () => {
    it('Should return a set of locations associated with a user id', async done => {
      const locations = await database('locations').select();
      const users = await utils.selectUsersByLocationID(locations[0].id);
      expect(users.length).toBe(1);
      done();
    });
  });

  describe('createNewUser', () => {
    beforeAll(async done => {
      await database.migrate.rollback();
      await database.migrate.latest();
      await database.seed.run();
      done();
    });
    it('Should return a new UUID with length of 36 and timestamps', async done => {
      const newUser = await utils.createNewUser();
      expect(newUser.id.length).toBe(36);
      expect(newUser.created_at).toBeDefined();
      expect(newUser.updated_at).toBeDefined();
      done();
    });
  });
  describe('insertLocation', () => {
    beforeAll(async done => {
      await database.migrate.rollback();
      await database.migrate.latest();
      await database.seed.run();
      done();
    });
    it('Should insert a user_location join for a user', async done => {
      const users = await database('users').select();
      const allLocations = await utils.selectAllLocations();
      const userLocations = await utils.selectLocationsByUserID(users[1].id);
      await utils.insertLocation(allLocations[0], users[1]);
      const userLocationsNext = await utils.selectLocationsByUserID(users[1].id);
      expect (userLocations.length).not.toBe(userLocationsNext.length);
      done();
    });
  });

  describe('getLocationByCoords', () => {});
  afterAll(async done => {
    await database.migrate.rollback();
    done();
  });
});
