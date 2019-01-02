import { mutationSchema } from '../mutationSchema';

describe('mutationSchema', () => {
  it('should match snapshot', () => {
    expect(mutationSchema).toMatchSnapshot();
  });
});
