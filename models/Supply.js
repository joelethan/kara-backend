import  mongoose  from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const supplySchema = new Schema({
    nameOfSupplier: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    contact: {
        type: String,
    },
    supplyDetails: [
        {
            itemName: {
                type: String,
            },
            quantity: {
                type: Number,
            },
            unitCost: {
                type: Number,
            },
            itemCategory: {
                type: String,
            },
        }
    ],
    isDeleted: {
        type: String,
        default: false
    },
    status: {
        type: String,
        default: "pending"
    },
    paymentMethod: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('supply', supplySchema)
