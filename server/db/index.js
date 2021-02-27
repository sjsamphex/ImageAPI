//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const Product = require('./models/Product');
const Recalls = require('./models/Recalls');
//associations could go here!
User.hasMany(Product);
Product.belongsTo(User);

Product.hasMany(Recalls);
Recalls.belongsTo(Product);

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' }),
  ]);
  const [cody, murphy] = users;

  return {
    users: {
      cody,
      murphy,
    },
  };
};

module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Product,
    Recalls,
  },
};
