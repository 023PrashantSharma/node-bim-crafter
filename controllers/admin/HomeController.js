const formidable = require('formidable')
const moment = require('moment')
const Admin = require('../../models/Admin')
const Slider = require('../../models/Slider')
const jwt = require('jsonwebtoken');
const { FooterGallery, FooterDetails } = require('../../models/Footer')
exports.index = (req, res) => {
    const data = { type: 2, fileName: 'home/slider' }
    var LocalStorage = require('node-localstorage').LocalStorage
    localStorage = new LocalStorage('./scratch');
    const decoded = jwt.verify(localStorage.getItem("dXNlcg=="), process.env.SECRET_KEY)
    Admin.findOne({
        '_id': decoded.user_id
    }).exec(function (err, userInfo) {
        if (err) {
            return res.redirect(admin);
        } else {
            res.render('admin_layout/index', { title: "Admin Home", data: data, flag_name: "sliderListTableData", master_menu: 'home', userInfo })
        }
    })
}
exports.footer = async (req, res) => {
    const data = { type: 2, fileName: 'home/footer' }
    var fetchData = await FooterDetails.find({}).exec();
    var LocalStorage = require('node-localstorage').LocalStorage
    localStorage = new LocalStorage('./scratch');
    const decoded = jwt.verify(localStorage.getItem("dXNlcg=="), process.env.SECRET_KEY)
    Admin.findOne({
        '_id': decoded.user_id
    }).exec(function (err, userInfo) {
        if (err) {
            return res.redirect(admin);
        } else {
            res.render('admin_layout/index', { title: "Admin Home", data: data, flag_name: "galleryListTableData", footerDetails: fetchData[0], master_menu: 'home', userInfo })
        }
    })
}
exports.addHomeSlider = (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        try {
            const slider_id = fields.slider_id
            const newData = new Slider({
                title1: fields.title2,
                title2: fields.title2,
                profile_picture: fields.profile_picture,
                description: fields.description
            });
            if (slider_id == '') {
                newData.save()
                    .then(data => {
                        return res.send({ status: "success", msg: "Banner Successfully Added...." });
                    }).catch(err => {
                        return res.send({ status: "error", msg: err.message });

                    });
            } else {
                let data = await Slider.updateOne(
                    { _id: slider_id },
                    {
                        $set: {
                            title1: fields.title2,
                            title2: fields.title2,
                            profile_picture: fields.profile_picture,
                            description: fields.description
                        }
                    }
                );
                return res.send({ status: "update", msg: "Banner Successfully Updated...." });
            }
        } catch (err) {
            console.log(err)
        }
    });
}

exports.homeSliderImagesListGridData = (req, res) => {

    var searchStr = req.body.search.value;

    const columns = {
        0: '_id',
        1: 'profile_picture',
        2: 'title1',
        3: 'title2',
        4: 'description',
        5: 'createdAt',
        6: 'status',
        7: '_id'
    }

    if (req.body.search.value) {
        var regex = new RegExp(req.body.search.value, "i")
        searchStr = { $or: [{ 'title1': regex }, { 'title2': regex }] };
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

    Slider.count(searchStr, function (err, c) {
        recordsTotal = c;
        Slider.count(searchStr, function (err, c) {
            recordsFiltered = c;
            Slider.find(searchStr, '_id profile_picture title1 title2 description createdAt status', { 'skip': Number(req.body.start), 'limit': Number(req.body.length) }, function (err, results) {
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

                    var slider_image = `<a class="item" href="/uploads/slider/${results[rs].profile_picture}" data-original-title="" title="" target="_blank"><img style="height: 100px;width: 100px;" class="icons" src="/uploads/slider/${results[rs].profile_picture}"></a>`;

                    var created = new Date(results[rs].createdAt);
                    var created_value = moment(created).format('Do MMMM, YYYY hh:mm A')

                    var nestedData = {
                        sr: i,
                        image_id: results[rs]._id,
                        title1: results[rs].title1,
                        title2: results[rs].title2,
                        slider_image: slider_image,
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
exports.homeBlockDataFunctionSliderImage = async (req, res) => {
    var id = req.body.id
    var change_status_name = req.body.change_status_name

    var Cstatus
    if (change_status_name == 'true') {
        Cstatus = true
        var msg = 'Active Successfully';
    } else {
        Cstatus = false
        var msg = 'Inactive Successfully';
    }

    let data = await Slider.updateOne(
        { _id: id },
        {
            $set: {
                status: Cstatus
            }
        }
    );
    return res.send({ status: "success", msg: msg });
}
exports.footerBlockDataFunctionGalleryImage = async (req, res) => {
    var id = req.body.id
    var change_status_name = req.body.change_status_name

    var Cstatus
    if (change_status_name == 'true') {
        Cstatus = true
        var msg = 'Active Successfully';
    } else {
        Cstatus = false
        var msg = 'Inactive Successfully';
    }

    let data = await FooterGallery.updateOne(
        { _id: id },
        {
            $set: {
                status: Cstatus
            }
        }
    );
    return res.send({ status: "success", msg: msg });
}
exports.homeDeleteSliderImage = async (req, res) => {
    var id = req.body.id
    let data = await Slider.deleteOne({ '_id': id });
    var status = 'success'
    var msg = 'Slider Image Successfully Deleted.'
    return res.send({ status: status, msg: msg });
}
exports.addFooterImage = (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        try {
            const gallery_img_id = fields.gallery_img_id
            const newData = new FooterGallery({
                gallery_image: fields.profile_picture,
            });
            if (gallery_img_id == '') {
                newData.save()
                    .then(data => {
                        return res.send({ status: "success", msg: "Gallery Successfully Added...." });
                    }).catch(err => {
                        return res.send({ status: "error", msg: err.message });

                    });
            } else {
                let data = await FooterGallery.updateOne(
                    { _id: gallery_img_id },
                    {
                        $set: {
                            gallery_image: fields.profile_picture,
                        }
                    }
                );
                return res.send({ status: "update", msg: "Gallery Successfully Updated...." });
            }
        } catch (err) {
            console.log(err)
        }
    });
}
exports.addFooterDetails = (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        try {
            const gallery_detail_id = fields.gallery_detail_id
            const newData = new FooterDetails({
                facebook: fields.facebook,
                instagram: fields.instagram,
                twitter: fields.twitter,
                youtube: fields.youtube,
                mobile_number: fields.mobile_number,
                mobile_number_optional: fields.mobile_number_optional,
                email: fields.email,
                address: fields.address,
                description: fields.description,
            });
            var fetchData = await FooterDetails.find({}).exec();
            if (fetchData.length < 1) {
                newData.save()
                    .then(data => {
                        return res.send({ status: "success", msg: "Footer Details Successfully Added...." });
                    }).catch(err => {
                        return res.send({ status: "error", msg: err.message });

                    });
            } else {
                let data = await FooterDetails.updateOne(
                    { _id: fetchData[0]._id },
                    {
                        $set: {
                            facebook: fields.facebook,
                            instagram: fields.instagram,
                            twitter: fields.twitter,
                            youtube: fields.youtube,
                            mobile_number: fields.mobile_number,
                            mobile_number_optional: fields.mobile_number_optional,
                            email: fields.email,
                            address: fields.address,
                            description: fields.description,
                        }
                    }
                );
                return res.send({ status: "update", msg: "Footer Details Successfully Updated...." });
            }
        } catch (err) {
            console.log(err)
        }
    });
}
exports.footerGalleryImagesListGridData = (req, res) => {

    var searchStr = req.body.search.value;

    const columns = {
        0: '_id',
        1: 'profile_picture',
        2: 'createdAt',
        3: 'status',
        4: '_id'
    }

    if (req.body.search.value) {
        var regex = new RegExp(req.body.search.value, "i")
        searchStr = { $or: [{ 'createdAt': regex }, { 'status': regex }] };
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

    FooterGallery.count(searchStr, function (err, c) {
        recordsTotal = c;
        FooterGallery.count(searchStr, function (err, c) {
            recordsFiltered = c;
            FooterGallery.find(searchStr, '_id gallery_image createdAt status', { 'skip': Number(req.body.start), 'limit': Number(req.body.length) }, function (err, results) {
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

                    var gallery_image = `<a class="item" href="/uploads/footer/${results[rs].gallery_image}" data-original-title="" title="" target="_blank"><img style="height: 100px;width: 100px;" class="icons" src="/uploads/footer/${results[rs].gallery_image}"></a>`;

                    var created = new Date(results[rs].createdAt);
                    var created_value = moment(created).format('Do MMMM, YYYY hh:mm A')

                    var nestedData = {
                        sr: i,
                        image_id: results[rs]._id,
                        gallery_image: gallery_image,
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
exports.footerDeleteSliderImage = async (req, res) => {
    var id = req.body.id
    let data = await FooterGallery.deleteOne({ '_id': id });
    var status = 'success'
    var msg = 'Footer Image Successfully Deleted.'
    return res.send({ status: status, msg: msg });
}