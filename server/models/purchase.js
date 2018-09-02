const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = Schema({
  category: {
    type: String,
    trim: true
  },

  description: {
    type: String,
    trim: true
  },

  value: {
    type: String,
    trim: true
  }
});

module.exports = purchaseSchema;