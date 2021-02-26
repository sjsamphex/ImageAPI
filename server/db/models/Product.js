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
    status: {
      type: Sequelize.BOOLEAN,
    },
    fdaData: {
      type: Sequelize.JSON,
    },
  },
  { timestamps: false }
);

module.exports = Product;
