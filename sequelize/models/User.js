'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uuid: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    tableName: 'User'
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};