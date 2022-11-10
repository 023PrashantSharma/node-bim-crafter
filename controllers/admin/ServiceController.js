const formidable = require('formidable')
const moment = require('moment')
const { PopularServices, UpcommingServices, softwareProficiancy } = require('../../models/Services')
const Admin = require('../../models/Admin')
const jwt = require('jsonwebtoken');
var LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./scratch');
const decoded = jwt.verify(localStorage.getItem("dXNlcg=="), process.env.SECRET_KEY)
exports.popular = (req, res) => {
    const data = { type: 2, fileName: 'services/popular' }
    Admin.findOne({
        '_id': decoded.user_id
    }).exec(function (err, userInfo) {
        if (err) {
            return res.redirect(admin);
        } else {
            res.render('admin_layout/index', { title: "Admin Services", data: data, flag_name: "servicesPopularListTableData", master_menu: 'services', userInfo })
        }
    })
}
exports.upcoming = (req, res) => {
    const data = { type: 2, fileName: 'services/upcoming' }
    Admin.findOne({
        '_id': decoded.user_id
    }).exec(function (err, userInfo) {
        if (err) {
            return res.redirect(admin);
        } else {
            res.render('admin_layout/index', { title: "Admin Services", data: data, flag_name: "servicesUpcomingListTableData", master_menu: 'services', userInfo })
        }
    })
}
exports.softwareProficiancy = (req, res) => {
    const data = { type: 2, fileName: 'services/software-proficiancy' }
    Admin.findOne({
        '_id': decoded.user_id
    }).exec(function (err, userInfo) {
        if (err) {
            return res.redirect(admin);
        } else {
            res.render('admin_layout/index', { title: "Admin Services", data: data, flag_name: "softwareProficiancyListTableData", master_menu: 'services', userInfo })
        }
    })
}
exports.popularServicesImagesListGridData = (req, res) => {

    var searchStr = req.body.search.value;

    const columns = {
        0: '_id',
        1: 'services_image',
        2: 'title',
        3: 'description',
        4: 'createdAt',
        5: 'status',
        6: '_id'
    }

    if (req.body.search.value) {
        var regex = new RegExp(req.body.search.value, "i")
        searchStr = { $or: [{ 'title': regex }] };
    } else {
        searchStr = {}
    }

    var start = req.body.start;
    var ordername = columns[req.body.order[0]['column']];
    var dir = req.body.order[0]['dir'];
    var recordsTotal = 0;
    var recordsFiltered = 0;

    var object = {};
    if (dir == 'desc') {
        object[ordername] = -1;
    } else {
        object[ordername] = 1;
    }

    PopularServices.count(searchStr, function (err, c) {
        recordsTotal = c;
        PopularServices.count(searchStr, function (err, c) {
            recordsFiltered = c;
            PopularServices.find(searchStr, '_id services_image title description createdAt status', { 'skip': Number(req.body.start), 'limit': Number(req.body.length) }, function (err, results) {
                if (err) {
                    console.log('error while getting results' + err);
                    return;
                }
                var resultData = []
                var i = parseInt(start) + parseInt(1)
                var display_status = '';
                for (const rs in results) {
                    if (results[rs].status == true) {
                        display_status = '<div id="status_show' + results[rs]._id + '"><badge class="badge badge-success">Active</badge></div>';
                    } else {
                        display_status = '<div id="status_show' + results[rs]._id + '"><badge class="badge badge-danger">Inactive</badge></div>';
                    }

                    var services_image = `<a class="item" href="/uploads/services/popular/${results[rs].services_image}" data-original-title="" title="" target="_blank"><img style="height: 100px;width: 100px;" class="icons" src="/uploads/services/popular/${results[rs].services_image}"></a>`;

                    var created = new Date(results[rs].createdAt);
                    var created_value = moment(created).format('Do MMMM, YYYY hh:mm A')

                    var nestedData = {
                        sr: i,
                        image_id: results[rs]._id,
                        title: results[rs].title,
                        services_image: services_image,
                        description: results[rs].description,
                        insert_date: created_value,
                        display_status: display_status,
                        status: results[rs].status
                    }
                    resultData.push(nestedData)
                    i++
                };

                var data = JSON.stringify({
                    "draw": req.body.draw,
                    "recordsFiltered": recordsFiltered,
                    "recordsTotal": recordsTotal,
                    "data": resultData
                });
                res.send(data);
            }).sort(object);
        });
    });

}
exports.upcomingServicesImagesListGridData = (req, res) => {

    var searchStr = req.body.search.value;

    const columns = {
        0: '_id',
        1: 'services_image',
        2: 'title',
        3: 'description',
        4: 'createdAt',
        5: 'status',
        6: '_id'
    }

    if (req.body.search.value) {
        var regex = new RegExp(req.body.search.value, "i")
        searchStr = { $or: [{ 'title': regex }] };
    } else {
        searchStr = {}
    }

    var start = req.body.start;
    var ordername = columns[req.body.order[0]['column']];
    var dir = req.body.order[0]['dir'];
    var recordsTotal = 0;
    var recordsFiltered = 0;

    var object = {};
    if (dir == 'desc') {
        object[ordername] = -1;
    } else {
        object[ordername] = 1;
    }

    UpcommingServices.count(searchStr, function (err, c) {
        recordsTotal = c;
        UpcommingServices.count(searchStr, function (err, c) {
            recordsFiltered = c;
            UpcommingServices.find(searchStr, '_id services_image title description createdAt status', { 'skip': Number(req.body.start), 'limit': Number(req.body.length) }, function (err, results) {
                if (err) {
                    console.log('error while getting results' + err);
                    return;
                }
                var resultData = []
                var i = parseInt(start) + parseInt(1)
                var display_status = '';
                for (const rs in results) {
                    if (results[rs].status == true) {
                        display_status = '<div id="status_show' + results[rs]._id + '"><badge class="badge badge-success">Active</badge></div>';
                    } else {
                        display_status = '<div id="status_show' + results[rs]._id + '"><badge class="badge badge-danger">Inactive</badge></div>';
                    }

                    var services_image = `<a class="item" href="/uploads/services/upcoming/${results[rs].services_image}" data-original-title="" title="" target="_blank"><img style="height: 100px;width: 100px;" class="icons" src="/uploads/services/upcoming/${results[rs].services_image}"></a>`;

                    var created = new Date(results[rs].createdAt);
                    var created_value = moment(created).format('Do MMMM, YYYY hh:mm A')

                    var nestedData = {
                        sr: i,
                        image_id: results[rs]._id,
                        title: results[rs].title,
                        services_image: services_image,
                        description: results[rs].description,
                        insert_date: created_value,
                        display_status: display_status,
                        status: results[rs].status
                    }
                    resultData.push(nestedData)
                    i++
                };

                var data = JSON.stringify({
                    "draw": req.body.draw,
                    "recordsFiltered": recordsFiltered,
                    "recordsTotal": recordsTotal,
                    "data": resultData
                });
                res.send(data);
            }).sort(object);
        });
    });

}
exports.softwareProficiancyImagesListGridData = (req, res) => {

    var searchStr = req.body.search.value;

    const columns = {
        0: '_id',
        1: 'software_icon',
        2: 'title',
        3: 'description',
        4: 'createdAt',
        5: 'status',
        6: '_id'
    }

    if (req.body.search.value) {
        var regex = new RegExp(req.body.search.value, "i")
        searchStr = { $or: [{ 'title': regex }] };
    } else {
        searchStr = {}
    }

    var start = req.body.start;
    var ordername = columns[req.body.order[0]['column']];
    var dir = req.body.order[0]['dir'];
    var recordsTotal = 0;
    var recordsFiltered = 0;

    var object = {};
    if (dir == 'desc') {
        object[ordername] = -1;
    } else {
        object[ordername] = 1;
    }

    softwareProficiancy.count(searchStr, function (err, c) {
        recordsTotal = c;
        softwareProficiancy.count(searchStr, function (err, c) {
            recordsFiltered = c;
            softwareProficiancy.find(searchStr, '_id software_icon title description createdAt status', { 'skip': Number(req.body.start), 'limit': Number(req.body.length) }, function (err, results) {
                if (err) {
                    console.log('error while getting results' + err);
                    return;
                }
                var resultData = []
                var i = parseInt(start) + parseInt(1)
                var display_status = '';
                for (const rs in results) {
                    if (results[rs].status == true) {
                        display_status = '<div id="status_show' + results[rs]._id + '"><badge class="badge badge-success">Active</badge></div>';
                    } else {
                        display_status = '<div id="status_show' + results[rs]._id + '"><badge class="badge badge-danger">Inactive</badge></div>';
                    }

                    var software_icon = `<a class="item" href="/uploads/services/software/${results[rs].software_icon}" data-original-title="" title="" target="_blank"><img style="height: 100px;width: 100px;" class="icons" src="/uploads/services/software/${results[rs].software_icon}"></a>`;

                    var created = new Date(results[rs].createdAt);
                    var created_value = moment(created).format('Do MMMM, YYYY hh:mm A')

                    var nestedData = {
                        sr: i,
                        image_id: results[rs]._id,
                        title: results[rs].title,
                        software_icon: software_icon,
                        description: results[rs].description,
                        insert_date: created_value,
                        display_status: display_status,
                        status: results[rs].status
                    }
                    resultData.push(nestedData)
                    i++
                };

                var data = JSON.stringify({
                    "draw": req.body.draw,
                    "recordsFiltered": recordsFiltered,
                    "recordsTotal": recordsTotal,
                    "data": resultData
                });
                res.send(data);
            }).sort(object);
        });
    });

}
exports.addPopularService = (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        try {
            const popular_service_id = fields.popular_service_id
            const newData = new PopularServices({
                title: fields.title,
                services_image: fields.profile_picture,
                description: fields.description
            });
            if (popular_service_id == '') {
                newData.save()
                    .then(data => {
                        return res.send({ status: "success", msg: "Services Successfully Added...." });
                    }).catch(err => {
                        return res.send({ status: "error", msg: err.message });

                    });
            } else {
                let data = await PopularServices.updateOne(
                    { _id: popular_service_id },
                    {
                        $set: {
                            title: fields.title,
                            services_image: fields.profile_picture,
                            description: fields.description
                        }
                    }
                );
                return res.send({ status: "update", msg: "Services Successfully Updated...." });
            }
        } catch (err) {
            console.log(err)
        }
    });
}
exports.addUpcomingService = (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        try {
            const upcoming_service_id = fields.upcoming_service_id
            const newData = new UpcommingServices({
                title: fields.title,
                services_image: fields.profile_picture,
                description: fields.description
            });
            if (upcoming_service_id == '') {
                newData.save()
                    .then(data => {
                        return res.send({ status: "success", msg: "Services Successfully Added...." });
                    }).catch(err => {
                        return res.send({ status: "error", msg: err.message });

                    });
            } else {
                let data = await UpcommingServices.updateOne(
                    { _id: upcoming_service_id },
                    {
                        $set: {
                            title: fields.title,
                            services_image: fields.profile_picture,
                            description: fields.description
                        }
                    }
                );
                return res.send({ status: "update", msg: "Services Successfully Updated...." });
            }
        } catch (err) {
            console.log(err)
        }
    });
}
exports.addSoftwareProficiancy = (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        try {
            const software_proficiancy_id = fields.software_proficiancy_id
            const newData = new softwareProficiancy({
                title: fields.title,
                software_icon: fields.profile_picture,
                description: fields.description
            });
            if (software_proficiancy_id == '') {
                newData.save()
                    .then(data => {
                        return res.send({ status: "success", msg: "Software Icon Successfully Added...." });
                    }).catch(err => {
                        return res.send({ status: "error", msg: err.message });

                    });
            } else {
                let data = await softwareProficiancy.updateOne(
                    { _id: software_proficiancy_id },
                    {
                        $set: {
                            title: fields.title,
                            software_icon: fields.profile_picture,
                            description: fields.description
                        }
                    }
                );
                return res.send({ status: "update", msg: "Software Icon Successfully Updated...." });
            }
        } catch (err) {
            console.log(err)
        }
    });
}