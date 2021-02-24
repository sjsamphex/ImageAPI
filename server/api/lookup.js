const router = require('express').Router();
const {
  models: { User, Product },
} = require('../db');

const bc = require('barcodelookup');
const { default: axios } = require('axios');
const { productResult } = require('../../staging/ProductResult');

module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    const barcode = req.body.bc;

    console.log('express is gonna look up this barcode ', barcode);
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
      if (!product.barcodeData) {
        // let bcresult = (
        //   await bc.lookup({
        //     key: '0acahhb1lv05gmgdnob1dyn9cj1v7x' || process.env.BARCODEKEY,
        //     barcode,
        //   })
        // ).data;
        let bcresult = productResult;
        product.barcodeData = bcresult;
        await product.save();
        // company = bcresult.products[0].brand;
      }
      if (!product.fdaData) {
        company = product.barcodeData.products[0].brand;

        console.log('we are working with this company:', company);
        let query = company.split(' ').join('+');
        const fdaResults = await axios.get(
          `https://api.fda.gov/food/enforcement.json?search=product_description:"${query}"`
        );
        console.log(fdaResults.data);
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
