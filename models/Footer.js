var mongoose = require('mongoose');
/**
 * Service Schema
 */
var FooterGallerySchema = new mongoose.Schema({
    gallery_image: {
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
var FooterDetailsSchema = new mongoose.Schema({
    facebook: {
        type: String,
        trim: true,
        default: ""
    },
    instagram: {
        type: String,
        trim: true,
        default: ""
    },
    twitter: {
        type: String,
        trim: true,
        default: ""
    },
    youtube: {
        type: String,
        trim: true,
        default: ""
    },
    mobile_number: {
        type: String,
        trim: true,
        default: ""
    },
    mobile_number_optional: {
        type: String,
        trim: true,
        default: ""
    },
    email: {
        type: String,
        trim: true,
        default: ""
    },
    address: {
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

const FooterGallery = mongoose.model("FooterGallery", FooterGallerySchema);
const FooterDetails = mongoose.model("FooterDetails", FooterDetailsSchema);
module.exports = {
    FooterGallery, FooterDetails
}
