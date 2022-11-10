var mongoose = require('mongoose');
/**
 * Service Schema
 */
var SliderSchema = new mongoose.Schema({
    title1: {
        type: String,
        trim: true,
        default: ""
    },
    title2: {
        type: String,
        trim: true,
        default: ""
    },
    profile_picture: {
        type: String,
        trim: true,
        default: ""
    },
    description: {
        type: String,
        trim: true,
        default: ""
    },
    status: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Slider", SliderSchema);

