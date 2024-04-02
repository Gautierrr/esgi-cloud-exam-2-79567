const { Sequelize } = require('sequelize')

// database
const sequelize = new Sequelize(
  process.env.DB_URL,
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);

// authentication and synchronization
sequelize.authenticate()
  .then(() => {
    sequelize.sync().catch(() => console.log("Cannot sync the database"));
  })
  .catch(() => console.log("Cannot connect to database, please check environment credentials"));

module.exports = sequelize;