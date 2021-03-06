import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { schema } from './schema';
import { insertLocation, getLocationByCoords } from './schema/utils';

require('dotenv').config();
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

app.post('/locations', async (req, res) => {
  if (req.body.location.is_moving) {
    return res.status(200).json(req.body);
  }
  const args = req.body;
  const { coords } = args.location;
  try {
    const locations = await getLocationByCoords(
      coords.latitude,
      coords.longitude,
    );
    if (locations.length) {
      const join = await insertLocation(locations[0], { id: args.userID });
      return res.status(200).json(join);
    }
    return res.status(200).json(args);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(app.get('port'), () => {
  console.log(`listening on port ${app.get('port')}`);
});
