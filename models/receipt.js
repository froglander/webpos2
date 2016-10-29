'use strict';
module.exports = function(sequelize, DataTypes) {
  var Receipt = sequelize.define('Receipt', {
    receiptTimestamp: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // Receipt is associated to customer and employee tables
        // Adds customer_id to receipt table
        Receipt.belongsTo(models.Customer);
        // Adds employee_id to receipt table
        Receipt.belongsTo(models.Employee);
      }
    }
  });
  return Receipt;
};