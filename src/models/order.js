const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderedBy: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    validate(value) {
      if (value.length != 10 || !value.match(/^\d{10}$/)) {
        throw new Error("Phone number must be a 10 digit Number!");
      }
    },
  },
  requiredCapacity: {
    type: Number,
    required: true,
  },
  orderPlacedOn: {
    type: String,
  },
  orderStatus: {
    type: String,
    default: "placed",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
