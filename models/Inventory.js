// Stock & Sales Management
import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const inventorySchema = new Schema({
  itemName: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("order", inventorySchema);
