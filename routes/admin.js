var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
const fs = require("fs")
const formidable = require('formidable');

router.use(bodyParser.urlencoded({ extended: true }));
/////////// IMPORT MIDDLEWARE ///////////
const Auth = require('../middleware/adminauth')
const NoAuth = require('../middleware/adminnoauth')
const multer = require('multer')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/file')
    },
    filename: (req, file, cb) => {
        let newName = Date.now() + '_' + file.originalname
        cb(null, newName)
    }
})

var upload = multer({ storage: storage })

/////////// IMPORT CONTROLLERS ///////////
const LoginController = require('../controllers/admin/Logincontroller')
const HomeController = require('../controllers/admin/HomeController')
const ServiceController = require('../controllers/admin/ServiceController')
const Dashboardcontroller = require('../controllers/admin/Dashboardcontroller')

//////////// UPLOADS IMAGES DATA OR FILE ROUTS /////////////////
/* router.post('/upload-attach-file',upload.single('file'),Settingmanagementcontroller.uploadAttachFile) */
router.post('/tinymce-upload-image', upload.single('file'), (req, res, next) => {
    console.log(req.file);
    return res.send({ location: req.file.path });
})
router.post('/upload-attach-file', (req, res, next) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }

        console.log(fields);
        var my_path = fields.path
        var type = fields.type
        var myfilename = fields.names
        var ext = myfilename.split('.').pop();

        var oldPath = files.file.path;
        var filename = Date.now() + '_' + files.file.name
        filename = filename.split(" ").join("")
        var newPath = 'public/' + my_path + '/' + filename
        var rawData = fs.readFileSync(oldPath)

        if (type == 1) {
            if (ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "JPG" || ext == "JPEG" || ext == "PNG") {
                fs.writeFile(newPath, rawData, function (err) {
                    if (err) {
                        return res.send({ response: 'error', filename: '' });
                    } else {
                        return res.send({ response: 'upload', filename: filename });
                    }
                })
            } else {
                return res.send({ response: 'error', filename: '' });
            }
        } else {
            return res.send({ response: 'error', filename: '' });
        }

    })
})
router.post('/delete-image-folder', (req, res) => {
    var pathToFile = 'public/' + req.body.path + req.body.img_name
    fs.unlink(pathToFile, function (err) {
        if (err) {
            return res.send({ status: "error" });
        } else {
            return res.send({ status: "success" });
            console.log("Successfully deleted the file.")
        }
    })
})

router.post('/upload-images', (req, res, next) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }

        var oldPath = files.file.path;
        var filename = files.file.name
        filename = filename.split(" ").join("")
        filename = Date.now() + '_' + filename
        var newPath = 'public/uploads/product/' + filename
        var rawData = fs.readFileSync(oldPath)

        fs.writeFile(newPath, rawData, function (err) {
            if (err) {
                return res.send(filename);
            } else {
                return res.send(filename);
            }
        })
    })
})

router.post('/delete-upload-images', (req, res) => {
    console.log(req.body);
    var pathToFile = 'public/uploads/product/' + req.body.fileList.filename
    fs.unlink(pathToFile, function (err) {
        if (err) {
            return res.send({ status: "error" });
        } else {
            return res.send({ status: "success" });
        }
    })
})

//////// Home /////////
router.get("/home-slider", Auth.adminAuth, HomeController.index)
router.post("/add-home-slider", Auth.adminAuth, HomeController.addHomeSlider)
router.post("/home-slider-images-list-grid-data", Auth.adminAuth, HomeController.homeSliderImagesListGridData)
router.post("/home-block-data-function-sliderimages", Auth.adminAuth, HomeController.homeBlockDataFunctionSliderImage)
router.post('/home-delete-slider-image', HomeController.homeDeleteSliderImage)

router.get("/home-footer", Auth.adminAuth, HomeController.footer)
router.post("/add-footer-image", Auth.adminAuth, HomeController.addFooterImage)
router.post("/add-footer-details", Auth.adminAuth, HomeController.addFooterDetails)
router.post("/footer-slider-images-list-grid-data", Auth.adminAuth, HomeController.footerGalleryImagesListGridData)
router.post('/footer-delete-slider-image', HomeController.footerDeleteSliderImage)
router.post('/footer-block-data-function-galleryimages', HomeController.footerBlockDataFunctionGalleryImage)

router.get("/services-popular", Auth.adminAuth, ServiceController.popular)
router.post("/popular-services-images-list-grid-data", Auth.adminAuth, ServiceController.popularServicesImagesListGridData)
router.post("/add-popular-service", Auth.adminAuth, ServiceController.addPopularService)

router.get("/services-upcoming", Auth.adminAuth, ServiceController.upcoming)
router.post("/upcoming-services-images-list-grid-data", Auth.adminAuth, ServiceController.upcomingServicesImagesListGridData)
router.post("/add-upcoming-service", Auth.adminAuth, ServiceController.addUpcomingService)

router.get("/software-proficiancy", Auth.adminAuth, ServiceController.softwareProficiancy)
router.post("/software-proficiancy-images-list-grid-data", Auth.adminAuth, ServiceController.softwareProficiancyImagesListGridData)
router.post("/add-software-proficiancy", Auth.adminAuth, ServiceController.addSoftwareProficiancy)


//////// Login Routs /////////
router.get("/", NoAuth.adminNoAuth, LoginController.index)
router.post('/admin-login-check', LoginController.adminLoginCheck)
router.post('/admin-session-logout', LoginController.logout)

router.get('/forgot-pws', NoAuth.adminNoAuth, LoginController.forgotPws)
router.post('/check-email', LoginController.checkEmail)
router.post('/forgot-password', LoginController.forgotPassword)
router.get('/recover-password/:token', LoginController.recoverPassword)
router.post('/submit-reset-password', LoginController.submitResetPassword)

router.get('/change-password', Auth.adminAuth, LoginController.changePassword)
router.post('/check-old-password', LoginController.checkOldPassword)
router.post('/update-admin-password', LoginController.updateUserPassword)

//////// Dashboard Routs /////////
router.get('/dashboard', Auth.adminAuth, Dashboardcontroller.dashboard)

module.exports = router;
