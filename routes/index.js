/**
 * index.js
 * @description :: index route of platforms
*/

var express = require('express');
var router = express.Router();

const FrontController = require('../controllers/front/FrontController')

/////// Users Management Routs ///////////
router.get('/', FrontController.index)
router.get('/about-us', FrontController.aboutUs)
router.get('/services', FrontController.services)
router.get('/contact-us', FrontController.contactUs)

/* ------------- GET Home Page ---------------- */

module.exports = router;
