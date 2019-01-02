import { UserType, LocationType } from '../types';

describe('types', () => {
  describe('UserType', () => {
    it('should match snapshot', () => {
      expect(UserType).toMatchSnapshot();
    });
  });
  describe('LocationType', () => {
    it('should match snapshot', () => {
      expect(LocationType).toMatchSnapshot();
    });
  });
});
