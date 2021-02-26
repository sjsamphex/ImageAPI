const router = require('express').Router();
const {
  models: { User, Product },
} = require('../db');

const { default: axios } = require('axios');
const { productResult } = require('../../staging/ProductResult');

module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    const barcode = req.body.bc;
    console.log('received this barcode from front end', barcode);

    // console.log('express is gonna look up this barcode ', barcode);
    if (barcode) {
      let product = await Product.findOne({
        where: {
          barcode,
        },
      });
      if (!product) {
        console.log('creating product in db');
        product = await Product.create({
          barcode,
        });
      }
      let company;
      if (!product.barcodeDataStatus) {
        console.log(product.barcode);
        //https://world.openfoodfacts.org/api/v0/product/0853584002201.json
        //URL to read data for a product: https://world.openfoodfacts.org/api/v0/product/[barcode].json
        let request = `https://world.openfoodfacts.org/api/v0/product/${product.barcode}.json`;
        let bcresult = await axios.get(request);
        // console.log(bcresult);
        // let bcresult = productResult;
        product.barcodeData = bcresult.data;
        console.log(product.barcodeData.status);
        product.status = product.barcodeData.status == 1 ? true : false;
        await product.save();
        // company = bcresult.products[0].brand;
      }
      if (!product.status) {
        res.send(null);
        return;
      }
      if (!product.fdaData) {
        company =
          product.barcodeData.product.brands ||
          product.barcodeData.product.brand_owner;

        // console.log('we are working with this company:', company);
        let query = company.split(' ').join('+');
        const fdaResults = await axios.get(
          `https://api.fda.gov/food/enforcement.json?search=product_description:"${query}"`
        );
        // console.log(fdaResults.data);
        product.fdaData = fdaResults.data;
        await product.save();
      }
      res.send(product);

      //make a search to FDA
      //https://api.fda.gov/food/enforcement.json?search=product_description:'canyon+bakehouse'
    }
  } catch (err) {
    next(err);
  }
});
