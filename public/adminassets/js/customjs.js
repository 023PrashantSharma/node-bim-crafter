var base_url = $("#base_url").val();
var admin = $("#admin").val();
var valid = {
	ajaxError: function (jqXHR, exception) {
		var msg = '';
		if (jqXHR.status === 0) {
			msg = 'Not connect.\n Verify Network.';
		} else if (jqXHR.status == 404) {
			msg = 'Requested page not found. [404]';
		} else if (jqXHR.status == 500) {
			msg = 'Internal Server Error [500].';
		} else if (exception === 'parsererror') {
			msg = 'Requested JSON parse failed.';
		} else if (exception === 'timeout') {
			msg = 'Time out error.';
		} else if (exception === 'abort') {
			msg = 'Ajax request aborted.';
		} else {
			msg = 'Uncaught Error.\n' + jqXHR.responseText;
		}
		return msg;
	},

	phonenumber: function (inputtxt) {
		var phoneno = /^\d{10}$/;
		return phoneno.test(inputtxt);
	},
	validPhone: function (inputtxt) {
		var phoneno = /^[0-9]\d{2,4}-\d{6,8}$/;
		return phoneno.test(inputtxt);
	},
	validURL: function (inputtxt) {
		var re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
		return re.test(inputtxt);
	},
	validateEmail: function (email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},
	validFBurl: function (enteredURL) {
		var FBurl = /^(http|https)\:\/\/www.facebook.com\/.*/i;
		return FBurl.test(enteredURL);
	},
	validTwitterurl: function (enteredURL) {
		var twitterURL = /^(http|https)\:\/\/twitter.com\/.*/i;
		return twitterURL.test(enteredURL);
	},
	validYoutubeURL: function (enteredURL) {
		var youtubeURL = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
		return youtubeURL.test(enteredURL);
	},
	validGPlusURL: function (enteredURL) {
		var gPlusURL = /\+[^/]+|\d{21}/;
		return gPlusURL.test(enteredURL);
	},
	validInstagramURL: function (enteredURL) {
		var instagramURL = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_\.]+)/im;
		return instagramURL.test(enteredURL);
	},
	validateExtension: function (val, type) {
		if (type == 1)
			var re = /(\.jpeg|\.jpg|\.png)$/i;
		else if (type == 2)
			var re = /(\.jpeg|\.jpg|\.png\.pdf|\.doc|\.xml|\.docx|\.PDF|\.DOC|\.XML|\.DOCX|\.xls|\.xlsx)$/i;
		else if (type == 3)
			var re = /(\.pdf|\.docx|\.PDF|\.DOC|\.DOCX)$/i;
		return re.test(val)
	},
	snackbar: function (msg) {
		$("#snackbar").html(msg).fadeIn('slow').delay(3000).fadeOut('slow');
	},
	snackbar2: function (msg) {
		$("#snackbar").html(msg).fadeIn('slow');
	},
	snackbar_error: function (msg) {
		$("#snackbar-error").html(msg).fadeIn('slow').delay(3000).fadeOut('slow');
	},
	snackbar_success: function (msg) {
		$("#snackbar-success").html(msg).fadeIn('slow').delay(3000).fadeOut('slow');
	},
	error: function (msg) {
		return "<p class='alert alert-warning'><strong>Error : </strong> " + msg + "</p>";
	},
	success: function (msg) {
		return "<p class='alert alert-success'>" + msg + "</p>";
	},
	info: function (msg) {
		return "<p class='alert alert-info'>" + msg + "</p>";
	}
};

jQuery(function ($) {
	"use strict";
	var width = $(window).width();
	if (width <= 720) {
		$('.cont').addClass('s--signup');
	}

	$('#userAddressTable').DataTable();

	$('.tooltip-d.well').tooltip({
		selector: "a[rel=tooltip]"
	})

	$(document).on('keypress', '.mobile-valid', function (e) {
		var $this = $(this);
		var regex = new RegExp("^[0-9\b]+$");
		var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		// for 10 digit number only
		if ($this.val().length > 9) {
			e.preventDefault();
			return false;
		}
		if (e.charCode < 54 && e.charCode > 47) {
			if ($this.val().length == 0) {
				e.preventDefault();
				return false;
			} else {
				return true;
			}
		}
		if (regex.test(str)) {
			return true;
		}
		e.preventDefault();
		return false;
	});


	$(document).on('keypress', '.name-valid', function (e) {
		if (event.charCode != 0) {
			var regex = new RegExp("^[a-zA-Z ]*$");
			var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
			if (!regex.test(key)) {
				event.preventDefault();
				return false;
			}
		}
	});

	$(document).on('click', '.copyModalData', function (e) {
		var copyText = $(this).data('text');
		var $temp = $("<input>");
		$(".copy-modal-text-1").append($temp);
		$temp.val(copyText).select();
		document.execCommand("copy");
		$temp.remove();
		valid.snackbar('Copied to Clipboard');
	});

	$(document).on('keypress', '.pin-code-valid', function (e) {
		var $this = $(this);
		var regex = new RegExp("^[0-9\b]+$");
		var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		if ($this.val().length > 5) {
			e.preventDefault();
			return false;
		}
		if (regex.test(str)) {
			return true;
		}
		e.preventDefault();
		return false;
	});


	$(document).on('keypress', '.number-valid', function (event) {
		if (!`${event.target.value}${event.key}`.match(/^[0-9]{0,5}$/)) {
			// block the input if result does not match
			event.preventDefault();
			event.stopPropagation();
			return false;
		}
	});

	$(".member_id_check").keydown(function (e) {
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)) ||
			(e.keyCode >= 35 && e.keyCode <= 40)) {
			return;
		}
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	});

	$(document).on('keypress', '.money-valid', function (e) {
		var $this = $(this);
		var regex = new RegExp("^[0-9\b]+$");
		var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		if (regex.test(str)) {
			return true;
		}
		e.preventDefault();
		return false;
	});

	$(document).on('click', '.blockUnblock', function (e) {
		var id = $(this).attr('id');
		var myArray = id.split('-');
		var table_id = myArray[3];
		var url;
		if (myArray[2] == 'category') {
			url = `${admin}/block-data-function-category`
		} else if (myArray[2] == 'subcategory') {
			url = `${admin}/block-data-function-subcategory`
		} else if (myArray[2] == 'sizechart') {
			url = `${admin}/block-data-function-sizechart`
		} else if (myArray[2] == 'products') {
			url = `${admin}/block-data-function-products`
		} else if (myArray[2] == 'coupons') {
			url = `${admin}/block-data-function-coupons`
		} else if (myArray[2] == 'users') {
			url = `${admin}/block-data-function-user`
		} else if (myArray[2] == 'sliderimages') {
			url = `${admin}/home-block-data-function-sliderimages`
		} else if (myArray[2] == 'galleryimages') {
			url = `${admin}/footer-block-data-function-galleryimages`
		}

		$.ajax({
			type: "POST",
			url: url,
			data: `id=${myArray[1]}&change_status_name=${myArray[3]}`,
			success: function (data) {
				if (myArray[0] == 'danger') {
					$("#" + id).html('<button class="p-2 btn btn-outline-success btn-xs m-l-5 btn_cls" type="button" title="Inactivate">Inactivate</button>');
					$(`#status_show${myArray[1]}`).html('<badge class="badge badge-success">Active</badge>');
					$(`#${id}`).attr('id', `success-${myArray[1]}-${myArray[2]}-false`);
				} else {
					$(`#${id}`).html('<button class="p-2 btn btn-outline-danger btn-xs m-l-5 btn_cls" type="button" title="Activate">Activate</button>');
					$(`#status_show${myArray[1]}`).html('<badge class="badge badge-danger">Inactive</badge>');
					$(`#${id}`).attr('id', `danger-${myArray[1]}-${myArray[2]}-true`);
				}
				$("#msg").html(valid.success(data.msg));
				$("#msg").fadeIn('slow').delay(5000).fadeOut('slow');
				/* dataTable.ajax.reload(); */
			},
			error: function (jqXHR, exception) {
				var msg = valid.ajaxError(jqXHR, exception);
				$("#msg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');

			}
		});
		e.preventDefault();
	});

	$(document).on('click', '.makeFeatureProduct', function (e) {
		var id = $(this).attr('id');
		var myArray = id.split('-');

		$.ajax({
			type: "POST",
			url: `${admin}/make-feature-product`,
			data: `id=${myArray[1]}&change_status_name=${myArray[2]}`,
			dataType: 'json',
			success: function (data) {
				if (myArray[0] == 'danger') {
					$(`#${id}`).html('<span class="badge badge-primary font-size-12">Featured</span>');
					$(`#${id}`).attr('id', `success-${myArray[1]}-false-${myArray[3]}-${myArray[4]}`);
				} else {
					$(`#${id}`).html('<span class="badge badge-danger font-size-12">Not Featured</span>');
					$(`#${id}`).attr('id', `danger-${myArray[1]}-true-${myArray[3]}-${myArray[4]}`);
				}
				$("#msg").html(valid.success(data.msg));
				$("#msg").fadeIn('slow').delay(5000).fadeOut('slow');
			},
			error: function (jqXHR, exception) {
				var msg = valid.ajaxError(jqXHR, exception);
				$("#msg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');

			}
		});
		e.preventDefault();
	});

	$(document).on('click', '.downloadExcel', function (e) {
		$.ajax({
			type: "POST",
			url: `${admin}/otp-send-for-verification`,
			data: { id: 'admin' },
			dataType: 'json',
			success: function (data) {
				if (data.status == "success") {
					$("#otp_number").html('OTP Sent To :- ' + data.mobile);
					$("#otpCheckModal").modal('show');
					$("#error_upi_otp").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
				}
			},
			error: function (jqXHR, exception) {
				var msg = valid.ajaxError(jqXHR, exception);
				$("#msg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
			}
		});
		e.preventDefault();
	});

	$(document).on('click', '.openPopupAddCategory', function (e) {
		var dataURL = $(this).attr('data-href');
		$('.cat_body').load(dataURL, function () {
			$('.cat_title').html("Add Category");
			$('#addCategoryModal').modal({ show: true });
		});
	});

	$(document).on('click', '.openPopupEditCategory', function (e) {
		var dataURL = $(this).attr('data-href');
		$('.cat_body').load(dataURL, function () {
			$('.cat_title').html("Edit Category");
			$('#addCategoryModal').modal({ show: true });
		});
	});

	$(document).on('click', '.openPopupAddSubCategory', function (e) {
		var dataURL = $(this).attr('data-href');
		$('.subcat_body').load(dataURL, function () {
			$('.subcat_title').html("Add Sub Category");
			$('#addSubCategoryModal').modal({ show: true });
		});
	});

	$(document).on('click', '.openPopupEditSubCategory', function (e) {
		var dataURL = $(this).attr('data-href');
		$('.subcat_body').load(dataURL, function () {
			$('.subcat_title').html("Edit Sub Category");
			$('#addSubCategoryModal').modal({ show: true });
		});
	});

	$(document).on('click', '.openPopupAddSizeChart', function (e) {
		var dataURL = $(this).attr('data-href');
		$('.chart_body').load(dataURL, function () {
			$('.chart_title').html("Add Size Chart");
			$('#addSizeChartModal').modal({ show: true });
		});
	});

	$(document).on('click', '.openPopupEditSizeChart', function (e) {
		var dataURL = $(this).attr('data-href');
		$('.chart_body').load(dataURL, function () {
			$('.chart_title').html("Add Size Chart");
			$('#addSizeChartModal').modal({ show: true });
		});
	});

	$(document).on('click', '.chart_formate', function (e) {
		var val = $("input[name='size_chart_act']:checked").val();
		if (val == 1) {
			$(".no_size").css("display", "none");
			$(".yes_size").css("display", "block");
		} else if (val == 2) {
			$(".no_size").css("display", "block");
			$(".yes_size").css("display", "none");
		}
	});

	$('input[type=radio][name=coupon_type]').change(function () {
		if (this.value == 1) {
			$("#coupon_code").attr('disabled', false);
		} else {
			$("#coupon_code").attr('disabled', true);
		}
	});

	$("#discount_type").change(function () {
		if ($("#discount_type").val() == 1) {
			$(".div_for_per").show();
			$("#dis_lab").html('Discount in Percentage %');
		} else {
			$(".div_for_per").hide();
			$("#dis_lab").html('Flat Discount');
		}
	});

	$(document).on('click', '.openPopupChangeOrderStatus', function (e) {
		var dataURL = $(this).attr('data-href');
		$('.change_body').load(dataURL, function () {
			$("#change_type").val(1);
			$('#shopOrderStatusModal').modal({ show: true });
		});
	});
	$(document).on('click', '.openPopupChangeOrderStatusDash', function (e) {
		var dataURL = $(this).attr('data-href');
		$('.change_body').load(dataURL, function () {
			$("#change_type").val(2);
			$('#shopOrderStatusModal').modal({ show: true });
		});
	});
	$(document).on('click', '.openPopupChangeOrderStatusView', function (e) {
		var dataURL = $(this).attr('data-href');
		$('.change_body').load(dataURL, function () {
			$('#shopOrderStatusModal').modal({ show: true });
		});
	});

	$(document).on('click', '.openPopupDeleteImage', function (e) {
		var image_id = $(this).attr('data-id');
		$("#delete_id").val(image_id);
		$('#imageDeleteModal').modal({ show: true });
	});
	$(document).on('click', '.openPopupDeleteSliderImage', function (e) {
		var image_id = $(this).attr('data-id');
		$("#delete_id").val(image_id);
		$('#imageDeleteModal').modal({ show: true });
	});
	$(document).on('click', '.openPopupDeleteFooterGalleryImage', function (e) {
		var image_id = $(this).attr('data-id');
		$("#delete_id").val(image_id);
		$('#imageDeleteModal').modal({ show: true });
	});
	$(document).on('click', '.openPopupForLogout', function (e) {
		$('#logoutmodal').modal({ show: true });
	});
});


function togglePassword(type) {
	if (type == 1) {
		$(".toggle-login-password").toggleClass("fa-eye fa-eye-slash");
		var input = $($(".toggle-login-password").attr("toggle"));
	} else if (type == 2) {
		$(".toggle-login-password2").toggleClass("fa-eye fa-eye-slash");
		var input = $($(".toggle-login-password2").attr("toggle"));
	} else if (type == 3) {
		$(".toggle-login-password").toggleClass("fa-eye fa-eye-slash");
		var input = $($(".toggle-login-password3").attr("toggle"));
	} else if (type == 4) {
		$(".toggle-login-password4").toggleClass("fa-eye fa-eye-slash");
		var input = $($(".toggle-login-password4").attr("toggle"));
	}
	if (input.attr("type") == "password") {
		input.attr("type", "text");
	} else {
		input.attr("type", "password");
	}
}

function random_password_generate(max, min) {
	var passwordChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@!%&()/";
	var randPwLen = Math.floor(Math.random() * (max - min + 1)) + min;
	var randPassword = Array(randPwLen).fill(passwordChars).map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
	return randPassword;
}
function generatePassword(passwordLength) {
	var numberChars = "0123456789";
	var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var lowerChars = "abcdefghijklmnopqrstuvwxyz";
	var sp_chr = "@!%&()";
	var allChars = numberChars + upperChars + lowerChars + sp_chr;
	var randPasswordArray = Array(passwordLength);
	randPasswordArray[0] = numberChars;
	randPasswordArray[1] = upperChars;
	randPasswordArray[2] = lowerChars;
	randPasswordArray[3] = sp_chr;
	randPasswordArray = randPasswordArray.fill(allChars, 4);
	return shuffleArray(randPasswordArray.map(function (x) { return x[Math.floor(Math.random() * x.length)] })).join('');
}

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}
function getPassword(type) {
	random_password = generatePassword(8);
	if (type == 1) {
		$("#password").trigger("focus");
		var e = jQuery.Event("keyup");
		$("#password").trigger(e);
		document.getElementById("password").value = random_password;

	}
}

function imageUpload(id, path, hidd_id, view_id, remove_id, type) {
	$('#submitBtn').attr('disabled', 'disabled');
	$('#submtBtn').attr('disabled', 'disabled');

	$(".img_error").trigger("focus");
	var e = jQuery.Event("keyup");
	$(".img_error").trigger(e);
	var names = [];
	var length = $("#" + id).get(0).files.length;
	for (var i = 0; i < $("#" + id).get(0).files.length; ++i) {
		names.push($("#" + id).get(0).files[i].name);
	}

	if (type == 4) {
		if (length > 2) {
			var fileName = names.join(', ');
			$("#" + id).closest('.form-group').find('.allfiletype').attr("value", length + " files selected");
		} else {
			$('.allfiletype').val(names);
			$("#" + id).closest('.form-group').find('.allfiletype').attr("value", names);
		}
	}
	if (id == 'pro_pic') {
		if (length > 2) {
			var fileName = names.join(', ');
			$("#" + id).closest('.form-group').find('.empimage').attr("value", length + " files selected");
		} else {
			$('.empimage').val(names);
			$("#" + id).closest('.form-group').find('.empimage').attr("value", names);
		}
	}
	else if (id == 'signat_pic') {
		if (length > 2) {
			var fileName = names.join(', ');
			$("#" + id).closest('.form-group').find('.signimage').attr("value", length + " files selected");
		} else {
			$('.signimage').val(names);
			$("#" + id).closest('.form-group').find('.signimage').attr("value", names);

		}
	}
	var formdata = new FormData();
	var files = $('#' + id)[0].files;
	if (files.length > 0) {
		formdata.append('file', files[0]);
		formdata.append('path', path);
		formdata.append('type', type)
		formdata.append('names', names)
		if (id == "pro_pic") {
			$(".progress_pro").css("display", "block");
		}
		else {
			$(".progress_sign").css("display", "block");
		}
		$.ajax({
			xhr: function () {
				var xhr = new window.XMLHttpRequest();
				xhr.upload.addEventListener("progress", function (evt) {
					if (evt.lengthComputable) {
						var percentComplete = ((evt.loaded / evt.total) * 100).toFixed(2);
						$(".progress-bar").width(percentComplete + '%');
						$(".progress-bar").html(percentComplete + '%');
					}
				}, false);
				return xhr;
			},
			method: "POST",
			url: `${admin}/upload-attach-file`,
			data: formdata,
			contentType: false,
			cache: false,
			processData: false,
			dataType: "json",
			beforeSend: function () {
				$(".progress-bar").width('0%');
			},
			error: function () {
				$('#uploadStatus').html('<p style="color:#EA4335;">File upload failed, please try again.</p>');
			},
			success: function (data) {
				if (data.response == 'upload') {
					if (type == 1) {
						/* $("#"+view_id).attr('src', base_url+'/'+path+data.filename); */
						$(".doc_append").html("<img id='" + view_id + "' class='" + view_id + "' src='" + '/' + path + data.filename + "' style='height: 100px; width: 100px;'>");
					} else if (type == 2) {

						if (data.ext == "jpg" || data.ext == "jpeg" || data.ext == "png") {
							$(".doc_append").html("");
							$("#" + view_id).attr('src', base_url + path + data.filename);
						} else {
							$("#" + view_id).attr('src', "");
							if (data.ext == "pdf") {
								$(".doc_append").html("<a href='" + base_url + path + data.filename + "' target='_blank'><img src='" + base_url + "adminassets/images/pdf.png' style='height: 100px; width: 100px;'></a>");
							} else if (data.ext == "doc" || data.ext == "docx") {
								$(".doc_append").html("<a href='" + base_url + path + data.filename + "' target='_blank'><img src='" + base_url + "adminassets/images/doc.png' style='height: 100px; width: 100px;'></a>");
							}
							else if (data.ext == "xls" || data.ext == "xlsx") {
								$(".doc_append").html("<a href='" + base_url + path + data.filename + "' target='_blank'><img src='" + base_url + "adminassets/images/xls.png' style='height: 100px; width: 100px;'></a>");
							}
						}
					}
					else if (type == 4) {

						if (data.ext == "jpg" || data.ext == "jpeg" || data.ext == "png") {
							$(".doc_append").html("");
							$("#" + view_id).attr('src', base_url + path + data.filename);
						} else {
							$("#" + view_id).attr('src', "");
							if (data.ext == "pdf") {
								$(".doc_append").html("<a href='" + base_url + path + data.filename + "' target='_blank'><img src='" + base_url + "adminassets/images/pdf.png' hstyle='height: 100px; width: 100px;'></a>");
							} else if (data.ext == "doc" || data.ext == "docx") {
								$(".doc_append").html("<a href='" + base_url + path + data.filename + "' target='_blank'><img src='" + base_url + "adminassets/images/doc.png' style='height: 100px; width: 100px;'></a>");
							}
							else if (data.ext == "xls" || data.ext == "xlsx") {
								$(".doc_append").html("<a href='" + base_url + path + data.filename + "' target='_blank'><img src='" + base_url + "adminassets/images/xls.png' style='height: 100px; width: 100px;'></a>");
							}
							else if (data.ext == "apk") {
								$(".doc_append").html("<a href='" + base_url + path + data.filename + "' target='_blank'><img src='" + base_url + "adminassets/images/apk.png' style='height: 100px; width: 100px;'></a>");
							}
							else {
								$(".doc_append").html("<a href='" + base_url + path + data.filename + "' target='_blank'><img src='" + base_url + "adminassets/images/allfile.png' style='height: 100px; width: 100px;'></a>");
							}

						}
					}

					//readURL(this, imgControlName);
					$('.' + view_id).addClass('it');
					$('#' + remove_id).css("display", "inline-block");
					$("#" + hidd_id).val(data.filename);
					window.setTimeout(function () {
						$(".progress").css("display", "none");
					}, 1000);

				} else if (data.response == 'error') {
					$(".progress").css("display", "none");
					if (type == 1) {
						$("#profile_picture").val("");
						$("#prof_pic").val("");
						$("#pro_pic").val("");
						valid.snackbar_error("Only jpg,jpeg and png file type allowed");
					} else if (type == 2) {
						valid.snackbar_error("Only jpg,jpeg, png, doc,xls and pdf file type allowed");
					}
					$("#" + id).closest('.form-group').find('.form-control').attr("value", "");
				}
				$('#submitBtn').removeAttr('disabled', 'disabled');
				$('#submtBtn').removeAttr('disabled', 'disabled');
			}
		});
	} else {
		valid.snackbar_error("Please select a file.");
	}
	e.preventDefault();
}
function removeImage(remove_id, img_id, view_id, img_name_id, path, type) {
	$(".img_error").trigger("focus");
	var e = jQuery.Event("keyup");
	$(".img_error").trigger(e);
	var img_name = $("#" + img_name_id).val();
	$.ajax({
		url: `${admin}/delete-image-folder`,
		type: 'POST',
		data: { img_name: img_name, path: path },
		dataType: "json",
		success: function (data) {
			if (data.status == "success") {
				$("#" + img_id).val("");
				$("#" + img_name_id).val("");
				if (type == 1) {
					$("#" + view_id).attr('src', "");
					$(".doc_append").html("");
				} else if (type == 2) {
					$("#" + view_id).attr('src', "");
					$(".doc_append").html("");

				} else if (type == 4) {
					$("#" + view_id).attr('src', "");
					$(".doc_append").html("");
					$(".allfiletype").val("");
				}

				if (remove_id == 'pro_pic_remove') {
					$('.empimage').val('');
				}
				else if (remove_id == 'sign_pic_remove') {
					$('.signimage').val('');
				}
				$('#' + remove_id).css("display", "none");
				$("#" + img_id).closest('.form-group').find('.form-control').attr("value", "");
			}
		}
	});
}

function getSubCategory(val) {
	if (val != '') {
		$("#sub_cat_id").html('<option value="">Loading Sub Category...</option>');
		$.ajax({
			url: `${admin}/get-sub-category`,
			type: 'POST',
			data: { id: val },
			dataType: "json",
			success: function (data) {
				$("#sub_cat_id").html('');
				if (data.subCatData != '') {
					$("#sub_cat_id").append('<option value="">--Select Sub Category--</option>');
					$.each(data.subCatData, function (key, val) {
						$("#sub_cat_id").append('<option value="' + val._id + '">' + val.subcat_name + '</option>');
					});
				} else {
					$("#sub_cat_id").html('<option value="">--Select Sub Category--</option>');
				}
			}
		});
	}
}


function addSizeChart() {
	var old_len = $('.add_more_size_chart tr:last').attr('id');
	old_len = old_len.split("_");
	var new_len = parseInt(old_len[1]) + 1;

	if (new_len <= 10) {

		var removeSizeCHart = "'chart_" + new_len + "'";

		markup = '<tr class="size_chart_remove" id="chart_' + new_len + '"><td>' + new_len + '</td><td><input type="text" name="size_chart[]" id="size_chart_' + new_len + '" class="form-control array-control" placeholder="Enter Chart Label"/></td><td><button type="button" class="effect-btn btn btn-danger squer-btn more-btn" onClick="removeProductSizeChart(' + removeSizeCHart + ');"><span class="fa fa-minus"></span></button></td></tr>';

		tableBody = $(".add_more_size_chart tbody:last-child");

		tableBody.append(markup);

		$("html, body").animate({ scrollTop: $(document).height() }, 1000);
	} else {
		valid.snackbar_error('You can add only upto 10 level size chart');
	}
}

function removeProductSizeChart(id) {
	$("#" + id).remove();
}

function getSizeLabel() {
	var val = $("#size_chart_token").val();
	if (val != '') {
		var old_label = $("#old_label").val();
		var product_id = $("#product_id").val();
		$.ajax({
			type: "POST",
			url: `${admin}/get-size-label`,
			data: { val: val, old_label: old_label, product_id: product_id },
			success: function (data) {
				$("#label_check").html(data.labelData);
			}
		});
	}
	else {
		$("#label_check").html('');
	}
}

$(document).on('click', '.select_all_label', function () {
	$(this).parent(".checkbox-inline").siblings().find('.checkbox_size_label').prop('checked', $(this).is(':checked'));
});

function delete_this(id) {
	$("#delete_id").attr("disabled", true);
	$.ajax({
		url: `${admin}/delete-slider-image`,
		type: 'POST',
		data: { id: id },
		dataType: "json",
		success: function (data) {
			if (data.status == 'success') {
				$('#imageDeleteModal').modal('hide');
				$("#delete_id").attr("disabled", false);
				$("#msg").html(valid.success(data.msg));
				$("#msg").fadeIn('slow').delay(5000).fadeOut('slow');
				dataTable.ajax.reload();
			} else {
				$("#msg").html(data.msg);
				$("#delete_id").attr("disabled", false);
				$("#msg").fadeIn('slow').delay(5000).fadeOut('slow');
			}
		}
	});
}
function deleteSliderFunction(id) {
	$("#delete_id").attr("disabled", true);
	$.ajax({
		url: `${admin}/home-delete-slider-image`,
		type: 'POST',
		data: { id: id },
		dataType: "json",
		success: function (data) {
			if (data.status == 'success') {
				$('#imageDeleteModal').modal('hide');
				$("#delete_id").attr("disabled", false);
				$("#msg").html(valid.success(data.msg));
				$("#msg").fadeIn('slow').delay(5000).fadeOut('slow');
				dataTable.ajax.reload();
			} else {
				$("#msg").html(data.msg);
				$("#delete_id").attr("disabled", false);
				$("#msg").fadeIn('slow').delay(5000).fadeOut('slow');
			}
		}
	});
}
function deleteFooterImageFunction(id) {
	$("#delete_id").attr("disabled", true);
	$.ajax({
		url: `${admin}/footer-delete-slider-image`,
		type: 'POST',
		data: { id: id },
		dataType: "json",
		success: function (data) {
			if (data.status == 'success') {
				$('#imageDeleteModal').modal('hide');
				$("#delete_id").attr("disabled", false);
				$("#msg").html(valid.success(data.msg));
				$("#msg").fadeIn('slow').delay(5000).fadeOut('slow');
				dataTable.ajax.reload();
			} else {
				$("#msg").html(data.msg);
				$("#delete_id").attr("disabled", false);
				$("#msg").fadeIn('slow').delay(5000).fadeOut('slow');
			}
		}
	});
}
function logoutmodalFun() {
	$.ajax({
		url: `${admin}/admin-session-logout`,
		type: 'POST',
		dataType: "json",
		success: function (data) {
			$('#logoutmodal').modal('hide');
		}
	});
}