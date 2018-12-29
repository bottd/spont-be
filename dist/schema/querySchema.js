"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql = require("graphql");
const types_1 = require("./types");
const utils_1 = require("./utils");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } = graphql;
exports.querySchema = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: {
            type: types_1.UserType,
            args: { id: { type: GraphQLNonNull(GraphQLString) } },
            resolve(parentValue, args) {
                return utils_1.selectUserByID(args.id);
            },
        },
        location: {
            type: types_1.LocationType,
            args: { id: { type: GraphQLNonNull(GraphQLString) } },
            resolve(parentValue, args) {
                return utils_1.selectLocationByID(args.id);
            },
        },
        locations: {
            type: new GraphQLList(types_1.LocationType),
            resolve(parentValue, args) {
                return utils_1.selectAllLocations();
            },
        },
    },
});
//# sourceMappingURL=querySchema.js.map