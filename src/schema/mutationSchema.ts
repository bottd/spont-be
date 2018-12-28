import * as graphql from 'graphql';
import { createNewUser, getLocationByCoords, insertLocation } from './utils';
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
      async resolve(parentValue, args) {
        const locations = await getLocationByCoords(args.latitude, args.longitude);
        if (locations.length > 1) {
          const join1 = await insertLocation(locations[0], {id: args.userID});
          const join2 = await insertLocation(locations[1], {id: args.userID});
          return join1;
        } else if (locations.length === 1) {
          const join1 = await insertLocation(locations[0], {id: args.userID});
          return join1;
        } else {
          return args;
        }
      },
    },
  },
});
