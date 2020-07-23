import  mongoose  from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const clientSchema = new Schema({
    clientName: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    // Top/Shirt
    shoulder: {type: String},
    upperBust: {type: String},
    bust: {type: String},
    lowerBust: {type: String},
    waist: {type: String},
    lowerWaist: {type: String},
    hips: {type: String},
    shoulderToUpperBust: {type: String},
    shoulderToBust: {type: String},
    shoulderToLowerBust: {type: String},
    shoulderToWaist: {type: String},
    shoulderToLowerWaist: {type: String},
    shoulderToHips: {type: String},

    // Sleeves
    shortSleeve: {type: String},
    threeQuarterSleeve: {type: String},
    fullLengthSleeve: {type: String},
    circumferenceSleeve: {type: String},

    // Dress
    shortDressFull: {type: String},
    longDressFull: {type: String},
    circumferenceDress: {type: String},

    // Skirt
    shortSkirtFull: {type: String},
    longSkirtFull: {type: String},

    // Trouser
    trouserThigh: {type: String},
    trouserFly: {type: String},
    trouserLength: {type: String},
    trouserBottomWidth: {type: String},
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('measurement', clientSchema)
