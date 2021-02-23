const router = require('express').Router();
const {
  models: { User },
} = require('../db');

const bc = require('barcodelookup');
const { default: axios } = require('axios');

module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    const barcode = req.body.bc;
    console.log('express is gonna look up this barcode ', barcode);
    if (barcode) {
      let bcresult = (
        await bc.lookup({
          key: '0acahhb1lv05gmgdnob1dyn9cj1v7x' || process.env.BARCODEKEY,
          barcode,
        })
      ).data;
      console.log(bcresult);
      let company = bcresult.products[0].brand;
      console.log(company);
      let query = company.split(' ').join('+');
      res.json(bcresult);
      const fdaResults = await axios.get(
        `https://api.fda.gov/food/enforcement.json?search=product_description:${query}`
      );
      console.log(fdaResults.data);
      //make a search to FDA
      //https://api.fda.gov/food/enforcement.json?search=product_description:'canyon+bakehouse'
    }
  } catch (err) {
    next(err);
  }
});
