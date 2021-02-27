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
      // let product = await Product.findOne({
      //   where: {
      //     barcode,
      //     userId: user.id,
      //   },
      // });
      // if (!product) {
      //   console.log('creating product in db');
      //   product = await Product.create({
      //     barcode,
      //     userId: user.id,
      //   });
      // }
      // let company;
      // if (!product.barcodeDataStatus) {
      //   console.log(product.barcode);
      //   //https://world.openfoodfacts.org/api/v0/product/0853584002201.json
      //   //URL to read data for a product: https://world.openfoodfacts.org/api/v0/product/[barcode].json
      //   let request = `https://world.openfoodfacts.org/api/v0/product/${product.barcode}.json`;
      //   let bcresult = await axios.get(request);
      //   product.barcodeData = bcresult.data;
      //   console.log(product.barcodeData.status);
      //   product.status = product.barcodeData.status == 1 ? true : false;
      //   await product.save();
      // }

      const product = await Product.findBarCode(barcode, user.id);
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
