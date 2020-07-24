import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const supplySchema = new Schema({
  nameOfSupplier: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  itemCategory: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("supply", supplySchema);
