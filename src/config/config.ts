import * as process from 'process';

export default () => ({
  node_env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 6000,
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
