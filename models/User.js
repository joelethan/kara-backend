import  mongoose  from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nextOfKin: {
        type: String,
    },
    gender: {
        type: String,
    },
    contact: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('user', userSchema)
