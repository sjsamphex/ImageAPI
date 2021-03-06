const router = require('express').Router();
const {
  models: { User, Product, Recalls },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const products = await Product.findAll({
      where: {
        status: true,
        userId: user.id,
      },
      include: Recalls,
    });
    res.send(products);
  } catch (err) {
    next(err);
  }
});
