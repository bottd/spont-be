import * as graphql from 'graphql';
import { selectLocationsByUserID, selectUsersByLocationID } from './utils';

const {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} = graphql;

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    locations: {
      type: new GraphQLList(LocationType),
      resolve(parentValue, args) {
        return selectLocationsByUserID(parentValue.id);
      },
    },
  }),
});

export const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: () => ({
    id: { type: GraphQLString },
    location_name: { type: GraphQLString },
    category: { type: GraphQLString },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return selectUsersByLocationID(args.id);
      },
    },
  }),
});

export const CoordType = new GraphQLObjectType({
  name: 'Coordinate',
  fields: () => ({
    userID: { type: GraphQLString },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
  }),
});
