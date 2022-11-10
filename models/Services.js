var mongoose = require('mongoose');
/**
 * Service Schema
 */
var ServicesPopularSechema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        default: ""
    },
    description: {
        type: String,
        trim: true,
        default: ""
    },
    services_image: {
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
var ServicesUpcomingSechema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        default: ""
    },
    description: {
        type: String,
        trim: true,
        default: ""
    },
    services_image: {
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
var SoftwareProficiancySechema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        default: ""
    },
    description: {
        type: String,
        trim: true,
        default: ""
    },
    software_icon: {
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

const PopularServices = mongoose.model("PopularServices", ServicesPopularSechema);
const UpcommingServices = mongoose.model("UpcommingServices", ServicesUpcomingSechema);
const softwareProficiancy = mongoose.model("softwareProficiancy", SoftwareProficiancySechema);
module.exports = {
    PopularServices, UpcommingServices, softwareProficiancy
}
