import * as graphql from 'graphql';
import { querySchema } from './querySchema';
// import { mutationSchema } from './mutationSchema';

const { GraphQLSchema } = graphql;

export const schema = new GraphQLSchema({
  query: querySchema,
  //  mutation: mutationSchema,
});
