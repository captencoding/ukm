'use strict';
const sequelize = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  //console.log(sequelize)
  //console.log(DataTypes);
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, 
  {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};