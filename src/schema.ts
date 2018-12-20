import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type User {
    id: String
    user_hash: String
  }
  type Query {
    users: [User]
  }
`);

