"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema_1 = require("./schema");
require('dotenv').config();
const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use('/graphql', graphqlHTTP({
    schema: schema_1.schema,
    graphiql: true,
}));
app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`);
});
//# sourceMappingURL=server.js.map