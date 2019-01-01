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
  console.log('not moving');
  const args = req.body;
  const { coords } = args;
  const missingParams = [];
  for (const requiredParam in ['latitude', 'longitude', 'userID']) {
    if (!args[requiredParam]) {
      missingParams.push(requiredParam);
    }
  }
  if (missingParams.length) {
    return res
      .status(400)
      .json({ message: `Missing required params of ${missingParams}` });
  }

  const locations = await getLocationByCoords(
    coords.latitude,
    coords.longitude,
  );
  if (locations.length) {
    const join = await insertLocation(locations[0], { id: args.userID });
    return res.status(200).json(join);
  }
  return res.status(200).json(args);
});

app.listen(app.get('port'), () => {
  console.log(`listening on port ${app.get('port')}`);
});
