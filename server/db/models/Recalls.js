const Sequelize = require('sequelize');
const db = require('../db');

const Recalls = db.define(
  'recalls',
  {
    recall_number: {
      type: Sequelize.STRING,
    },
    product_description: {
      type: Sequelize.STRING,
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

Recalls.getData = async () => {};

module.exports = Recalls;
