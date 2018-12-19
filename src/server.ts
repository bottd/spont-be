import * as express from 'express';
import * as graphql from 'graphql';
import * as knex from 'knex';
import * as graphHTTP from 'express-graphql';

const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];

const database = knex(config);
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());

//app.use('/graphql', graphqlHTTP({
// schema: MyGraphQLSchema,
// graphiql: true
//}));

app.listen(app.get('port'), () => {
  console.log(`listening on port ${app.get('port')}`);
});
