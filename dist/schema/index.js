"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql = require("graphql");
const querySchema_1 = require("./querySchema");
// import { mutationSchema } from './mutationSchema';
const { GraphQLSchema } = graphql;
exports.schema = new GraphQLSchema({
    query: querySchema_1.querySchema,
});
//# sourceMappingURL=index.js.map