import  mongoose  from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const clientSchema = new Schema({
    clientName: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
    },
    assignedTailor: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    orderDescription: {
        type: String
    },
    orderDetails: [
        {
            item: {
                type: String,
            },
            quantity: {
                type: Number,
            },
            unitCost: {
                type: Number,
            }
        }
    ],
    orderDate: {
        type: Date,
    },
    dueDate: {
        type: Date,
    }
})

module.exports = mongoose.model('order', clientSchema)
