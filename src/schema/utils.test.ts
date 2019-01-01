import * as utils from './utils';

describe('utils methods', () => {
  describe('selectAllLocations', () => {
    it('should return all locations in locations table', async () => {
      const result = await utils.selectAllLocations();
      expect(result).toBe(true);
    });
  });
  describe('selectUserByID', () => {});
  describe('selectLocationsByID', () => {});
  describe('selectLocationsByUserID', () => {});
  describe('selectUsersByLocationID', () => {});
  describe('createNewUser', () => {});
  describe('insertLocation', () => {});
  describe('getLocationByCoords', () => {});
});
