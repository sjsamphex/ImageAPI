const router = require('express').Router();
const {
  models: { User, Product },
} = require('../db');

const axios = require('axios');
const { productResult } = require('../../staging/ProductResult');

module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const barcode = req.body.bc;

    // console.log('express is gonna look up this barcode ', barcode);
    if (barcode) {
      const product = await Product.findBarCode(barcode, user.id);
      if (!product.status) {
        res.send(null);
        return;
      }
      if (!product.fdaData) {
        company =
          product.barcodeData.product.brands ||
          product.barcodeData.product.brand_owner;

        console.log('we are working with this company:', company);
        let query = company.split(' ').join('+');
        const fdaResults = await axios.get(
          `https://api.fda.gov/food/enforcement.json?limit=10&sort=report_date:desc&search=product_description:"${query}"`
        );
        // console.log(fdaResults.data);
        product.fdaData = fdaResults.data;
        await product.save();
      }
      res.send(product);

      //make a search to FDA
      //https://api.fda.gov/food/enforcement.json?limit=10&sort=report_date:desc&search=product_description:%22canyon+bakehouse%22
    }
  } catch (err) {
    next(err);
  }
});
