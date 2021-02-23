// Stock & Sales Management 
import  mongoose  from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const clientSchema = new Schema({
    itemName: {
        type: String,
        // required: true
    },
    quantity: {
        type: Number,
        // required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('inventory', clientSchema)
