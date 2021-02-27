'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    tax: DataTypes.FLOAT,
    inv_min: DataTypes.FLOAT,
    inv_max: DataTypes.FLOAT
  }, {
    tableName: 'Plan'
  });
  Plan.associate = function(models) {
    // associations can be defined here
  };
  return Plan;
};