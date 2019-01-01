import * as knex from 'knex';
import * as utils from '../utils';
const environment = process.env.NODE_ENV || 'development';
const config = require('../../../knexfile')[environment];
const database = knex(config);

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
    interface Location {
      location_name: string;
      category: string;
      latitude: number;
      longitude: number;
    }
    it('Should return a set of locations associated with a user id', async done => {
      const users = await database('users').select();
      const userLocations = await utils.selectLocationsByUserID(users[0].id);
      const locations = userLocations.map((location: Location) => ({
        category: location.category,
        location_name: location.location_name,
        latitude: location.latitude,
        longitude: location.longitude,
      }));
      expect(locations).toMatchSnapshot();
      done();
    });
  });
  describe('selectUsersByLocationID', () => {});
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
  describe('insertLocation', () => {});
  describe('getLocationByCoords', () => {});
  afterAll(async done => {
    await database.migrate.rollback();
    done();
  });
});
