const { Sequelize } = require('sequelize');

var host = "localhost" //Your mysql host
var username = "root"; //Your mysql username
var password = "" //Your myqsl password 
var databases = "seryucargo" //Your mysql databases

const sequelize = new Sequelize(databases, username, password, {
  host: host,
  dialect: 'mysql'
});

try {
   sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;