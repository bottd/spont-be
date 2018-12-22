import * as express from 'express';
import * as knex from 'knex';
import * as graphqlHTTP from 'express-graphql';
import { schema } from './schema';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(app.get('port'), () => {
  console.log(`listening on port ${app.get('port')}`);
});
