import { schema } from '../';

describe('Schema', () => {
  it('should match snapshot', () => {
    expect(schema).toMatchSnapshot();
  });
});
