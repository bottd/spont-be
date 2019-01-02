import { querySchema } from '../querySchema';

describe('querySchema', () => {
  it('should match snapshot', () => {
    expect(querySchema).toMatchSnapshot();
  });
});
