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
const knex = require("knex");
const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = knex(config);
exports.rootValue = {
    user: ({ id }) => selectUserByID(id),
    userLocations: ({ id }) => selectLocationsByUserID(id),
    location: ({ id }) => selectLocationByID(id),
    locations: () => database('locations').select(),
    newUser: () => createNewUser(),
    locationUsers: ({ id }) => selectUsersByLocationID(id),
};
function selectUserByID(id) {
    return database('users')
        .where('id', id)
        .first();
}
function selectLocationByID(id) {
    return database('locations')
        .where('id', id)
        .first();
}
function selectLocationsByUserID(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const locationJoins = yield database('user_locations')
            .where('user_id', id)
            .select();
        const locations = locationJoins.map(join => selectLocationByID(join.location_id));
        return Promise.all(locations);
    });
}
function selectUsersByLocationID(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userJoins = yield database('user_locations')
            .where('location_id', id)
            .select();
        const users = userJoins.map(join => selectUserByID(join.user_id));
        return Promise.all(users);
    });
}
function createNewUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = yield database('users').insert({}, '*');
        return newUser[0];
    });
}
//# sourceMappingURL=resolver.js.map