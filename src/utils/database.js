const Sequelize = require('sequelize')

const sequelize = new Sequelize('sors', 'root', 'your local password here', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;