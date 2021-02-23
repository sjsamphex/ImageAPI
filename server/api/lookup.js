const router = require('express').Router();
const {
  models: { User },
} = require('../db');

const bc = require('barcodelookup');

module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    const barcode = req.body.bc;
    let bcresult = await bc.lookup({
      key: process.env.BARCODEKEY,
      barcode,
    });
    console.log(bcresult);
    res.json(users);
  } catch (err) {
    next(err);
  }
});
