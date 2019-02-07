module.exports = {
  "development": {
    "username": "root",
    "password": "changemessig",
    "database": "ssig_development",
    "host": "0.0.0.0",
    "port": 3306,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": "ssig_production",
    "host": process.env.DATABASE_HOST,
    "port": process.env.DATABASE_PORT,
    "dialect": "mysql"
  }
}
