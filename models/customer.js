'use strict';
module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {
    preferredContactMethod: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // Define one to one relationship between customer and person
        // Source.belongsTo(Target) will add TargetID to Source model
        // This adds customer_id to person
        Customer.belongsTo(models.Person);
      }
    }
  });
  return Customer;
};