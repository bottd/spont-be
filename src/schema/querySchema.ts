import * as graphql from 'graphql';
import { UserType, LocationType } from './types';
import {
  selectUserByID,
  selectLocationByID,
  selectAllLocations,
} from './utils';

const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } = graphql;

export const querySchema = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, args) {
        return selectUserByID(args.id);
      },
    },
    location: {
      type: LocationType,
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, args) {
        return selectLocationByID(args.id);
      },
    },
    locations: {
      type: new GraphQLList(LocationType),
      resolve(parentValue, args) {
        return selectAllLocations();
      },
    },
  },
});
