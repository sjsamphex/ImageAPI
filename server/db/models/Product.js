const Sequelize = require('sequelize');
const db = require('../db');
const axios = require('axios');
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
      defaultValue: true,
    },
    fdaData: {
      type: Sequelize.JSON,
    },
  },
  { timestamps: false }
);

Product.findBarCode = async (barcode, userId) => {
  let product = await Product.findOne({
    where: {
      barcode,
      userId,
    },
  });
  if (!product) {
    console.log('creating product in db');
    product = await Product.create({
      barcode,
      userId,
    });
  }
  let company;
  if (!product.barcodeDataStatus) {
    // console.log(product.barcode);
    //https://world.openfoodfacts.org/api/v0/product/0853584002201.json
    //URL to read data for a product: https://world.openfoodfacts.org/api/v0/product/[barcode].json
    let request = `https://world.openfoodfacts.org/api/v0/product/${product.barcode}.json`;
    let bcresult = await axios.get(request);
    product.barcodeData = bcresult.data;
    // console.log(product.barcodeData.status);
    if (product.barcodeData.status == 0) {
      product.status = false;
    }
    // product.status = product.barcodeData.status == 1 ? true : false;
    await product.save();
  }
  // if (!product.status) {
  //   return null;
  // }
  return product;
};

module.exports = Product;
