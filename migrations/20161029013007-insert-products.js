'use strict';

// Require our models
var models = require("../models");

var sequelize = require('../models').sequelize;

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return models.Product.bulkCreate(
        [
          {productName: "Dog harness", description: "Fun, colorful, comfortable harness for your pampered pooch!", price: 22.99, cost: 12.00, sku: "123-456", upc: 1234567890, invCount: 10 },
          {productName: "Horse halter", description: "Sturdily built, American made leather halter", price: 84.99, cost: 37.50, sku: "789-123", upc: 9876543219, invCount: 5 }
        ]
    )
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
