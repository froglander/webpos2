'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProductTransaction = sequelize.define('ProductTransaction', {
    quantity: DataTypes.INTEGER,
    transactionPrice: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // Define many to many relationship between productiontransaction and receipt
        // Adds ProductTransaction_ID to Receipt table
        //ProductTransaction.hasOne(models.Receipt, {through: 'ProductTransaction_Receipt'});
        // Define one to one relationship between productiontransaction and product
        // Adds Product_ID to ProductTransaction table
        ProductTransaction.belongsTo(models.Product);
      }
    }
  });
  return ProductTransaction;
};