const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define(
  'product',
  {
    barcode: {
      type: Sequelize.STRING,
    },
    barcodeData: {
      type: Sequelize.JSON,
    },
    fdaData: {
      type: Sequelize.JSON,
    },
  },
  { timestamps: false }
);

module.exports = Product;
