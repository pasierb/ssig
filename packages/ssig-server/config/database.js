const defaultConfig = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: "mysql"
};

module.exports = {
  production: defaultConfig,
  development: {
    ...defaultConfig,
    host: '0.0.0.0',
    port: 3306,
    database: "ssig_development",
    username: "root",
    password: "changemessig"
  },
  test: {
    ...defaultConfig,
    host: '0.0.0.0',
    port: 3306,
    database: "ssig_test",
    username: "root",
    password: "changemessig"
  }
};
