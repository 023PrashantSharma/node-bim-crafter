const Admin = require('../../models/Admin')
// const Orders = require('../../models/Orders');
const Slider = require('../../models/Slider');
const { PopularServices, UpcommingServices, softwareProficiancy } = require('../../models/Services')

var moment = require("moment");
let request = require('request');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

exports.dashboard = async (req, res) => {
    var total_slider = await Slider.countDocuments({}).exec();
    var total_services = await PopularServices.countDocuments({}).exec();
    var total_upcoming = await UpcommingServices.countDocuments({}).exec();
    var total_software = await softwareProficiancy.countDocuments({}).exec();
    const data = { type: 2, fileName: 'dashboard/index' }
    let apiKey = '9e6a61aa27362e3c77560116a0b86ede';
    let city = 'jaipur';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    let date = new Date()
    date = moment(date).format('Do MMMM, YYYY')
    var LocalStorage = require('node-localstorage').LocalStorage
    localStorage = new LocalStorage('./scratch');
    const decoded = jwt.verify(localStorage.getItem("dXNlcg=="), process.env.SECRET_KEY)
    Admin.findOne({
        '_id': decoded.user_id
    }).exec(function (err, userInfo) {
        if (err) {
            return res.redirect(admin);
        } else {
            request(url, function (err, response, body) {
                if (err) {
                    console.log('error:', error);
                } else {
                    // console.log('body:', JSON.stringify(JSON.parse(body), null, 4));
                    res.render('admin_layout/index', { title: "Dashboard", flag_name: "pendingOrderListTableFlag", weather: JSON.parse(body), data: data, today: date, total_slider, total_upcoming, total_services, total_software, userInfo })
                }
            })
        }
    })
}

// exports.pendingOrdersListGridData = (req, res) => {
//     var searchStr = req.body.search.value;

//     const columns = {
//         0: '_id',
//         1: 'order_id',
//         2: 'username',
//         3: 'transaction_id',
//         4: 'grandTotal',
//         5: 'order_status',
//         6: 'createdAt',
//         7: '_id',
//     }

//     if (req.body.search.value) {
//         searchStr = {
//             $and: [
//                 {
//                     $or: [
//                         { 'order_id': new RegExp((req.body.search.value).trim(), 'i') },
//                         { 'username': new RegExp((req.body.search.value).trim(), 'i') },
//                         { 'transaction_id': new RegExp((req.body.search.value).trim(), 'i') },
//                     ]
//                 }, {
//                     $and: [
//                         { 'order_status': 0 },
//                     ]
//                 }]
//         };
//     }
//     else {
//         searchStr = { 'order_status': 0 };
//     }

//     var start = req.body.start;
//     var ordername = columns[req.body.order[0]['column']];
//     var dir = req.body.order[0]['dir'];
//     var recordsTotal = 0;
//     var recordsFiltered = 0;

//     var object = {};
//     if (dir == 'desc') {
//         object[ordername] = -1;
//     } else {
//         object[ordername] = 1;
//     }

//     Orders.count(searchStr, function (err, c) {
//         recordsTotal = c;
//         Orders.count(searchStr, function (err, c) {
//             recordsFiltered = c;
//             Orders.find(searchStr, '_id order_id user_id username transaction_id grandTotal order_status createdAt', { 'skip': Number(req.body.start), 'limit': Number(req.body.length) }, function (err, results) {
//                 if (err) {
//                     console.log('error while getting results' + err);
//                     return;
//                 }

//                 var resultData = []
//                 var i = parseInt(start) + parseInt(1)
//                 var display_status = '';
//                 for (const rs in results) {
//                     if (results[rs].order_status == 0) {
//                         display_status = '<badge class="badge badge-info">Pending</badge>';
//                     } else if (results[rs].order_status == 1) {
//                         display_status = '<badge class="badge badge-success">Accepted</badge>';
//                     } else if (results[rs].order_status == 2) {
//                         display_status = '<badge class="badge badge-primary">Shipped</badge>';
//                     } else if (results[rs].order_status == 3) {
//                         display_status = '<badge class="badge badge-warning">Out For Delivery</badge>';
//                     } else if (results[rs].order_status == 4) {
//                         display_status = '<badge class="badge badge-success">Delivered</badge>';
//                     } else if (results[rs].order_status == 5) {
//                         display_status = '<badge class="badge badge-danger">Rejected</badge>';
//                     }

//                     var created = new Date(results[rs].createdAt);
//                     var created_value = moment(created).format('Do MMMM, YYYY')

//                     var nestedData = {
//                         sr: i,
//                         order_no: results[rs].order_id,
//                         username: `<a target="_blank" href="${admin}/view-user/${results[rs].user_id}">${results[rs].username} <span class="fa fa-eye"></span></a>`,
//                         transaction_id: results[rs].transaction_id,
//                         order_value: '&#x20b9; ' + results[rs].grandTotal,
//                         display_status: display_status,
//                         order_date: created_value,
//                         order_id: results[rs]._id,
//                         order_status: results[rs].order_status
//                     }
//                     resultData.push(nestedData)
//                     i++
//                 };

//                 var data = JSON.stringify({
//                     "draw": req.body.draw,
//                     "recordsFiltered": recordsFiltered,
//                     "recordsTotal": recordsTotal,
//                     "data": resultData
//                 });
//                 res.send(data);
//             }).sort(object);
//         });
//     });
// }

// exports.outfordeliveryOrdersListGridData = (req, res) => {
//     var searchStr = req.body.search.value;

//     const columns = {
//         0: '_id',
//         1: 'order_id',
//         2: 'username',
//         3: 'transaction_id',
//         4: 'grandTotal',
//         5: 'order_status',
//         6: 'createdAt',
//         7: '_id',
//     }

//     if (req.body.search.value) {
//         searchStr = {
//             $and: [
//                 {
//                     $or: [
//                         { 'order_id': new RegExp((req.body.search.value).trim(), 'i') },
//                         { 'username': new RegExp((req.body.search.value).trim(), 'i') },
//                         { 'transaction_id': new RegExp((req.body.search.value).trim(), 'i') },
//                     ]
//                 }, {
//                     $and: [
//                         { 'order_status': 3 },
//                     ]
//                 }]
//         };
//     }
//     else {
//         searchStr = { 'order_status': 3 };
//     }

//     var start = req.body.start;
//     var ordername = columns[req.body.order[0]['column']];
//     var dir = req.body.order[0]['dir'];
//     var recordsTotal = 0;
//     var recordsFiltered = 0;

//     var object = {};
//     if (dir == 'desc') {
//         object[ordername] = -1;
//     } else {
//         object[ordername] = 1;
//     }

//     Orders.count(searchStr, function (err, c) {
//         recordsTotal = c;
//         Orders.count(searchStr, function (err, c) {
//             recordsFiltered = c;
//             Orders.find(searchStr, '_id order_id user_id username transaction_id grandTotal order_status createdAt', { 'skip': Number(req.body.start), 'limit': Number(req.body.length) }, function (err, results) {
//                 if (err) {
//                     console.log('error while getting results' + err);
//                     return;
//                 }

//                 var resultData = []
//                 var i = parseInt(start) + parseInt(1)
//                 var display_status = '';
//                 for (const rs in results) {
//                     if (results[rs].order_status == 0) {
//                         display_status = '<badge class="badge badge-info">Pending</badge>';
//                     } else if (results[rs].order_status == 1) {
//                         display_status = '<badge class="badge badge-success">Accepted</badge>';
//                     } else if (results[rs].order_status == 2) {
//                         display_status = '<badge class="badge badge-primary">Shipped</badge>';
//                     } else if (results[rs].order_status == 3) {
//                         display_status = '<badge class="badge badge-warning">Out For Delivery</badge>';
//                     } else if (results[rs].order_status == 4) {
//                         display_status = '<badge class="badge badge-success">Delivered</badge>';
//                     } else if (results[rs].order_status == 5) {
//                         display_status = '<badge class="badge badge-danger">Rejected</badge>';
//                     }

//                     var created = new Date(results[rs].createdAt);
//                     var created_value = moment(created).format('Do MMMM, YYYY')

//                     var nestedData = {
//                         sr: i,
//                         order_no: results[rs].order_id,
//                         username: `<a target="_blank" href="${admin}/view-user/${results[rs].user_id}">${results[rs].username} <span class="fa fa-eye"></span></a>`,
//                         transaction_id: results[rs].transaction_id,
//                         order_value: '&#x20b9; ' + results[rs].grandTotal,
//                         display_status: display_status,
//                         order_date: created_value,
//                         order_id: results[rs]._id,
//                         order_status: results[rs].order_status
//                     }
//                     resultData.push(nestedData)
//                     i++
//                 };

//                 var data = JSON.stringify({
//                     "draw": req.body.draw,
//                     "recordsFiltered": recordsFiltered,
//                     "recordsTotal": recordsTotal,
//                     "data": resultData
//                 });
//                 res.send(data);
//             }).sort(object);
//         });
//     });
// }


// exports.getExportDatabase = async (req, res) => {

//     const exec = require("child_process").exec;
//     const cmd = "mongodump --host localhost --port 27017 --username rootuser --password matka123 --authenticationDatabase sattamatka --archive=/opt/bitnami/apache/htdocs/dump/backup.gz --gzip"
//     exec(cmd, (error, stdout, stderr) => {
//         if (error) {
//             console.log('Error Block Me Aaya');
//             console.warn(error);
//         } else if (stdout) {
//             console.log('stdout Block Me Aaya');
//             console.log(stdout);
//         } else {
//             console.log('Last Wale Block Me Aaya');
//             console.log(stderr);
//             const file = "dump/backup.gz"
//             res.download(file)
//         }
//     });
// }