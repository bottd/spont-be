import * as graphql from 'graphql';
import { createNewUser } from './utils';
import { UserType, CoordType } from './types';

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
} = graphql;

export const mutationSchema = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    createUser: {
      type: UserType,
      args: {},
      resolve(parentValue, args) {
        return createNewUser();
      },
    },
    insertCoords: {
      type: CoordType,
      args: {
        userID: { type: GraphQLNonNull(GraphQLString) },
        latitude: { type: GraphQLNonNull(GraphQLFloat) },
        longitude: { type: GraphQLNonNull(GraphQLFloat) },
      },
      resolve(parentValue, args) {
        return args;
      },
    },
  },
});
