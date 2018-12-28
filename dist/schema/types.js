"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql = require("graphql");
const utils_1 = require("./utils");
const { GraphQLObjectType, GraphQLFloat, GraphQLList, GraphQLString, GraphQLNonNull, } = graphql;
exports.UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        created_at: { type: GraphQLString },
        updated_at: { type: GraphQLString },
        locations: {
            type: new GraphQLList(exports.LocationType),
            resolve(parentValue, args) {
                return utils_1.selectLocationsByUserID(parentValue.id);
            },
        },
    }),
});
exports.LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: () => ({
        id: { type: GraphQLString },
        location_name: { type: GraphQLString },
        category: { type: GraphQLString },
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
        users: {
            type: new GraphQLList(exports.UserType),
            resolve(parentValue, args) {
                return utils_1.selectUsersByLocationID(args.id);
            },
        },
    }),
});
exports.CoordType = new GraphQLObjectType({
    name: 'Coordinate',
    fields: () => ({
        userID: { type: GraphQLString },
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
    }),
});
//# sourceMappingURL=types.js.map