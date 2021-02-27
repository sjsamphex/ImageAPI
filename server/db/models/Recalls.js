const Sequelize = require('sequelize');
const db = require('../db');

const Recalls = db.define(
  'recalls',
  {
    company: {
      type: Sequelize.STRING,
    },
    product_description: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
    report_date: {
      type: Sequelize.STRING,
    },
    reason_for_recall: {
      type: Sequelize.TEXT,
    },
  },
  { timestamps: false }
);

module.exports = Recalls;
