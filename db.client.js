const { Sequelize } = require('sequelize')

// database
const sequelize = new Sequelize(
  'postgres://fakeurl',
  process.env.DB_URL,
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // User
  process.env.DB_PASSWORD, // Password
  // ou directement le lien 'internale' ou 'externale'
  {
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