const router = require('express').Router();
const {
  models: { User },
} = require('../db');

const bc = require('barcodelookup');

module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    const barcode = req.body.bc.text;
    console.log('express is gonna look up this barcode ', barcode);
    let bcresult = await bc.lookup({
      key: '0acahhb1lv05gmgdnob1dyn9cj1v7x' || process.env.BARCODEKEY,
      barcode,
    });
    console.log(bcresult);
    res.json(bcresult);
  } catch (err) {
    next(err);
  }
});
