require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: 'http://localhost:5432',
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: 'data/migrations'
    },
    seeds: { directory: './data/seeds' }
  },
};
