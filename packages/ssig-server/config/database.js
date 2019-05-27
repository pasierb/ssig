const defaultConfig = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: "mysql"
};

module.exports = {
  development: {
    ...defaultConfig,
    username: 'root',
    password: 'changemessig',
    database: 'ssig_development'
  },
  test: {
    ...defaultConfig,
    database: "ssig_test",
    username: "root",
    password: "changemessig",
    logging: false
  },
  production: defaultConfig
};
