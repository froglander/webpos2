'use strict';
module.exports = function(sequelize, DataTypes) {
  var Vendor = sequelize.define('Vendor', {
    companyName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // Defines one to one relationship between employee and person
        // Source.belongsTo(Target) will add TargetID to Source model
        // This adds customer_id to vendor
        Vendor.belongsTo(models.Person, {as: 'Contact'});
        // Adds VendorID to Product
        // This adds vendor_id to product talbe
        Vendor.hasMany(models.Product);
      }
    }
  });
  return Vendor;
};