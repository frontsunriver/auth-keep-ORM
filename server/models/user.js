const bcrypt = require('bcrypt-nodejs');

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('authkeeper', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  // Model attributes are defined here

  email: { type: DataTypes.STRING},

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'user'
});


module.exports = User;
