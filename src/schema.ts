import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type User {
    id: String
    created_at: String
    updated_at: String
  }
  type Location {
    location_name: String
    category: String
    latitude: Float
    longitude: Float
  }
  type Query {
    user (id: String!): User
    userLocations (id: String!): [Location]
    locations: [Location]
    location (id: String!): Location
    locationUsers (id: String!): [User]
  }
  type Mutation {
    newUser: User
  }
`);

