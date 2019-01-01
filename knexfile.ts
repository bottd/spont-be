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
  test: {
    client: 'pg',
    connection: 'postgres://localhost/spont_test',
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/testing',
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './dist/db/migrations',
    },
    seeds: {
      directory: './dist/db/seeds',
    },
    useNullAsDefault: true,
  },
};
