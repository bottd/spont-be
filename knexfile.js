module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/spont_dev',
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true',
    migrations: {
      directory: './dist/migrations',
    },
    seeds: {
      directory: './dist/seeds',
    },
    useNullAsDefault: true,
  },
};
