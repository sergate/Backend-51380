const mongoose = require('mongoose');
const ticketSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    purchaseDateTime: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    purchaser: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
const ticketModel = mongoose.model('ticketsCollection', ticketSchema);
module.exports = ticketModel;