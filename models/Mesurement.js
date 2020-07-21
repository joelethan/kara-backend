import  mongoose  from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const clientSchema = new Schema({
    clientName: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    measurementType: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('mesurement', clientSchema)
