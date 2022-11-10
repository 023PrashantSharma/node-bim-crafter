const Slider = require('../../models/Slider')
const { FooterGallery, FooterDetails } = require('../../models/Footer')
const { PopularServices, UpcommingServices, softwareProficiancy } = require('../../models/Services')

exports.index = async (req, res) => {
    const data = { type: 2, fileName: 'home' }
    var sliderData = await Slider.find({}).exec();
    var FooterGalleryData = await FooterGallery.find({}).exec();
    var FooterDetailsData = await FooterDetails.find({}).exec();
    var PopularServicesData = await PopularServices.find({}).exec();
    var UpcommingServicesData = await UpcommingServices.find({}).exec();
    var softwareProficiancyData = await softwareProficiancy.find({}).exec();
    res.render('front_layout/index', { title: "Home", data: data, sliderData, FooterGalleryData, FooterDetailsData: FooterDetailsData[0], PopularServicesData: PopularServicesData.slice(0, 4), UpcommingServicesData: UpcommingServicesData.slice(0, 4), softwareProficiancyData })
}
exports.aboutUs = async (req, res, next) => {
    var FooterGalleryData = await FooterGallery.find({}).exec();
    var FooterDetailsData = await FooterDetails.find({}).exec();
    const data = { type: 2, fileName: 'about-us' }
    res.render('front_layout/index', { title: "About Us", data: data, FooterGalleryData, FooterDetailsData: FooterDetailsData[0] })
}
exports.services = async (req, res, next) => {
    var FooterGalleryData = await FooterGallery.find({}).exec();
    var FooterDetailsData = await FooterDetails.find({}).exec();
    var PopularServicesData = await PopularServices.find({}).exec();
    const data = { type: 2, fileName: 'services' }
    res.render('front_layout/index', { title: "Services", data: data, FooterGalleryData, FooterDetailsData: FooterDetailsData[0], PopularServicesData })
}
exports.contactUs = async (req, res, next) => {
    var FooterGalleryData = await FooterGallery.find({}).exec();
    var FooterDetailsData = await FooterDetails.find({}).exec();
    const data = { type: 2, fileName: 'contact-us' }
    res.render('front_layout/index', { title: "Contact Us", data: data, FooterGalleryData, FooterDetailsData: FooterDetailsData[0] })
}