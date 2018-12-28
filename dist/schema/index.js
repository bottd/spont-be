"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql = require("graphql");
const querySchema_1 = require("./querySchema");
const mutationSchema_1 = require("./mutationSchema");
const { GraphQLSchema } = graphql;
exports.schema = new GraphQLSchema({
    query: querySchema_1.querySchema,
    mutation: mutationSchema_1.mutationSchema,
});
//# sourceMappingURL=index.js.map