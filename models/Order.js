import  mongoose  from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const clientSchema = new Schema({
    clientName: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    assignedTailor: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    orderDetails: [
        {
            item: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            unitCost: {
                type: Number,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('order', clientSchema)
