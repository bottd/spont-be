"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql = require("graphql");
const utils_1 = require("./utils");
const types_1 = require("./types");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLFloat, } = graphql;
exports.mutationSchema = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        createUser: {
            type: types_1.UserType,
            args: {},
            resolve(parentValue, args) {
                return utils_1.createNewUser();
            },
        },
        insertCoords: {
            type: types_1.CoordType,
            args: {
                userID: { type: GraphQLNonNull(GraphQLString) },
                latitude: { type: GraphQLNonNull(GraphQLFloat) },
                longitude: { type: GraphQLNonNull(GraphQLFloat) },
            },
            resolve(parentValue, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const locations = yield utils_1.getLocationByCoords(args.latitude, args.longitude);
                    if (locations.length) {
                        const join = yield utils_1.insertLocation(locations[0], { id: args.userID });
                        return join;
                    }
                    else {
                        return args;
                    }
                });
            },
        },
    },
});
//# sourceMappingURL=mutationSchema.js.map