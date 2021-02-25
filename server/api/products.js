const router = require('express').Router();
const {
  models: { User, Product },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({});
    res.send(products);
  } catch (err) {
    next(err);
  }
});
