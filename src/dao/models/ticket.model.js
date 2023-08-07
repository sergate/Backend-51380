const mongoose = require('mongoose');
const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  purchaseDateTime: {
    type: Date,
    default: Date.now(),
  },
  amount: {
    type: Number,
  },
  purchaser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts',
  },
  products: {
    type: Array,
  },
});
const ticketModel = mongoose.model('ticketsCollection', ticketSchema);
module.exports = ticketModel;