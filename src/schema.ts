import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type User {
    id: String
    created_at: String
    updated_at: String
    locations: [Location]
  }
  type Location {
    location_name: String
    category: String
    latitude: Float
    longitude: Float
  }
  type Query {
    user (id: String!): User
    locations: [Location]
  }
  type Mutation {
    newUser: User
  }
`);

