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
$(document).ready(function () {
	$('.in_field').on('change', function (e) {
		var select2 = $(this).attr('id');
		var val = $("#" + select2).val();
		if (val != '') {
			$("#" + select2).removeClass("error");
			$("#" + select2 + "-error").css("display", "none");
		}

	});
	$.validator.addMethod("checklower", function (value) {
		return /[a-z]/.test(value);
	});
	$.validator.addMethod("checkupper", function (value) {
		return /[A-Z]/.test(value);
	});
	$.validator.addMethod("checkdigit", function (value) {
		return /[0-9]/.test(value);
	}); $.validator.addMethod("checkspecial", function (value) {
		return /[!@#$%^&*()_+|*{}<>]/.test(value);
	});

	$.validator.addMethod('lessThanEqual', function (value, element, param) {
		if (this.optional(element)) return true;
		var i = parseInt(value);
		var j = parseInt($("#product_mrp").val());
		return i <= j;
	}, "The value {0} must be less than {1}");

	$('#open_game_result').hide();
	jQuery.validator.addMethod("dollarsscents", function (value, element) {
		return this.optional(element) || /^\d{0,4}(\.\d{0,2})?$/i.test(value);
	}, "You must include two decimal places");

	//Login Form
	$("#sliderForm").validate({
		rules: {
			title1: {
				required: true,
			},
			title2: {
				required: true,
			},
			prof_pic: {
				required: true,
			},
			description: {
				required: true,
			},
		},
		messages: {
			title1: {
				required: "Please enter title 1",
			},
			title2: {
				required: "Please enter title 2",
			},
			prof_pic: {
				required: "Please select image",
			},
			description: {
				required: "Please enter description",
			},
		},
		submitHandler: function (form) {
			$("#submitBtn").attr("disabled", true);
			$("#btn_spinner").css("display", "inline-block");
			$.ajax({
				url: `${admin}/add-home-slider`,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					if (data.status == "success") {
						$("#msg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$('#sliderForm')[0].reset();
						$("#prof_pic").val("");
						$("#profile_picture").val("");
						$("#pro_pic").val("");
						$(".doc_append").html("");
						$("#pro_pic_view").attr('src', "");
						$("#pro_pic_remove").css("display", "none");
						dataTable.ajax.reload();
					} else if (data.status == "update") {
						$("#msg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						dataTable.ajax.reload();
					}
					else {
						$("#msg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").prop("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#msg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").prop("disabled", false);
				}
			});
			return false;
		}
	});
	$("#footerDetails").validate({
		rules: {
			facebook: {
				required: true,
			},
			instagram: {
				required: true,
			},
			twitter: {
				required: true,
			},
			youtube: {
				required: true,
			},
			description: {
				required: true,
			},
		},
		messages: {
			facebook: {
				required: "Please enter facebook url",
			},
			instagram: {
				required: "Please enter instagram url",
			},
			twitter: {
				required: "Please enter twitter url",
			},
			youtube: {
				required: "Please enter youtube url",
			},
			description: {
				required: "Please enter description url",
			},
		},
		submitHandler: function (form) {
			$("#submitBtn").attr("disabled", true);
			$("#btn_spinner").css("display", "inline-block");
			$.ajax({
				url: `${admin}/add-footer-details`,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					$("#msg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").prop("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#msg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").prop("disabled", false);
				}
			});
			return false;
		}
	});
	$("#footerGallery").validate({
		rules: {
			prof_pic: {
				required: true,
			}
		},
		messages: {
			prof_pic: {
				required: "Please select gallery image"
			},
		},
		submitHandler: function (form) {
			$("#submitBtn2").attr("disabled", true);
			$("#btn_spinner2").css("display", "inline-block");
			$.ajax({
				url: `${admin}/add-footer-image`,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					if (data.status == "success") {
						$("#msg2").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$('#footerGallery')[0].reset();
						$("#prof_pic").val("");
						$("#profile_picture").val("");
						$("#pro_pic").val("");
						$(".doc_append").html("");
						$("#pro_pic_view").attr('src', "");
						$("#pro_pic_remove").css("display", "none");
						dataTable.ajax.reload();
					} else if (data.status == "update") {
						$("#msg2").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						dataTable.ajax.reload();
					}
					else {
						$("#msg2").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner2").css("display", "none");
					$("#submitBtn2").prop("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#msg2").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner2").css("display", "none");
					$("#submitBtn2").prop("disabled", false);
				}
			});
			return false;
		}
	});
	$("#servicesPopularForm").validate({
		rules: {
			title: {
				required: true,
			},
			prof_pic: {
				required: true,
			},
			description: {
				required: true,
			},
		},
		messages: {
			title: {
				required: "Please enter title",
			},
			prof_pic: {
				required: "Please select image",
			},
			description: {
				required: "Please enter description",
			},
		},
		submitHandler: function (form) {
			$("#submitBtn").attr("disabled", true);
			$("#btn_spinner").css("display", "inline-block");
			$.ajax({
				url: `${admin}/add-popular-service`,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					if (data.status == "success") {
						$("#msg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$('#servicesPopularForm')[0].reset();
						$("#prof_pic").val("");
						$("#profile_picture").val("");
						$("#pro_pic").val("");
						$(".doc_append").html("");
						$("#pro_pic_view").attr('src', "");
						$("#pro_pic_remove").css("display", "none");
						dataTable.ajax.reload();
					} else if (data.status == "update") {
						$("#msg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						dataTable.ajax.reload();
					}
					else {
						$("#msg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").prop("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#msg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").prop("disabled", false);
				}
			});
			return false;
		}
	});
	$("#servicesUpcomingForm").validate({
		rules: {
			title: {
				required: true,
			},
			prof_pic: {
				required: true,
			},
			description: {
				required: true,
			},
		},
		messages: {
			title: {
				required: "Please enter title",
			},
			prof_pic: {
				required: "Please select image",
			},
			description: {
				required: "Please enter description",
			},
		},
		submitHandler: function (form) {
			$("#submitBtn").attr("disabled", true);
			$("#btn_spinner").css("display", "inline-block");
			$.ajax({
				url: `${admin}/add-upcoming-service`,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					if (data.status == "success") {
						$("#msg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$('#servicesUpcomingForm')[0].reset();
						$("#prof_pic").val("");
						$("#profile_picture").val("");
						$("#pro_pic").val("");
						$(".doc_append").html("");
						$("#pro_pic_view").attr('src', "");
						$("#pro_pic_remove").css("display", "none");
						dataTable.ajax.reload();
					} else if (data.status == "update") {
						$("#msg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						dataTable.ajax.reload();
					}
					else {
						$("#msg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").prop("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#msg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").prop("disabled", false);
				}
			});
			return false;
		}
	});
	$("#softwareProficiancyForm").validate({
		rules: {
			title: {
				required: true,
			},
			prof_pic: {
				required: true,
			},
			description: {
				required: true,
			},
		},
		messages: {
			title: {
				required: "Please enter title",
			},
			prof_pic: {
				required: "Please select image",
			},
			description: {
				required: "Please enter description",
			},
		},
		submitHandler: function (form) {
			$("#submitBtn").attr("disabled", true);
			$("#btn_spinner").css("display", "inline-block");
			$.ajax({
				url: `${admin}/add-software-proficiancy`,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					if (data.status == "success") {
						$("#msg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$('#softwareProficiancyForm')[0].reset();
						$("#prof_pic").val("");
						$("#profile_picture").val("");
						$("#pro_pic").val("");
						$(".doc_append").html("");
						$("#pro_pic_view").attr('src', "");
						$("#pro_pic_remove").css("display", "none");
						dataTable.ajax.reload();
					} else if (data.status == "update") {
						$("#msg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						dataTable.ajax.reload();
					}
					else {
						$("#msg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").prop("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#msg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").prop("disabled", false);
				}
			});
			return false;
		}
	});
	$("#loginform").validate({
		rules: {
			username: {
				required: true,
			},
			password: {
				required: true,
			},
		},
		messages: {
			username: {
				required: "Please enter username",
			},
			password: {
				required: "Please enter password",
			},
		},
		submitHandler: function (form) {
			$("#submitBtn").attr("disabled", true);
			$("#btn_spinner").css("display", "inline-block");
			$.ajax({
				url: `${admin}/admin-login-check`,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					if (data.status == "success") {
						$("#loginmsg").html(valid.success(data.msg));
						var url = admin + "/dashboard";
						$(location).attr('href', url);
					}
					else {
						$("#loginmsg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#loginmsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				}
			});
			return false;
		}
	});

	//Change Password Form
	$("#changePassFrm").validate({
		rules: {
			old_password: {
				required: true,
				remote: {
					url: `${admin}/check-old-password`,
					type: "post"
				},
			},
			new_password: {
				required: true,
				minlength: 8, checklower: true, checkupper: true, checkdigit: true, checkspecial: true,
			},
			confirm_password: {
				required: true,
				equalTo: "#new_password",
			},
		},
		messages: {
			old_password: {
				required: "Please enter old password",
				remote: "Old password does not match",
			},
			new_password: {
				required: "Please enter new password",
				minlength: "Password must contain 8 characters", checklower: "Password must contain lower case character",
				checkupper: "Password must contain upper case character",
				checkdigit: "Password must contain number",
				checkspecial: "Password must contain at least one special character",
			},
			confirm_password: {
				required: "Please enter confirm password",
				equalTo: "Confirm password does not match",
			}
		},
		submitHandler: function (form) {
			$("#submitBtn").attr("disabled", true);
			$("#btn_spinner").css("display", "inline-block");
			$.ajax({
				url: `${admin}/update-admin-password`,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					if (data.status == "update") {
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$('#changePassFrm')[0].reset();
					} else {
						$("#errormsg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#errormsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				}
			});
			return false;
		}
	});
	//Recover Form
	$("#recoverform").validate({
		rules: {
			email: {
				required: true,
				remote: {
					url: `${admin}/check-email`,
					type: "post"
				},
			},
		},
		messages: {
			email: {
				required: "Please enter email",
				remote: "Email is not found",
			},
		},
		submitHandler: function (form) {
			$("#submitBtn").attr("disabled", true);
			$("#btn_spinner").css("display", "inline-block");
			$.ajax({
				url: `${admin}/forgot-password`,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					if (data.status == "success") {
						$("#recovermsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$('#recoverform')[0].reset();
					} else {
						$("#recovermsg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#recovermsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				}
			});
			return false;
		}
	});

	//Password Reset
	$("#resetFrm").validate({
		rules: {
			new_password: {
				required: true,
				minlength: 8, checklower: true, checkupper: true, checkdigit: true, checkspecial: true,
			},
			confirm_password: {
				required: true,
				equalTo: "#new_password",
			},
		},
		messages: {
			new_password: {
				required: "Please enter new password",
				minlength: "Password must contain 8 characters", checklower: "Password must contain lower case character",
				checkupper: "Password must contain upper case character",
				checkdigit: "Password mu	st contain number",
				checkspecial: "Password must contain at least one special character",
			},
			confirm_password: {
				required: "Please enter confirm password",
				equalTo: "Confirm password does not match",
			}
		},
		submitHandler: function (form) {
			$("#submitBtn").attr("disabled", true);
			$("#btn_spinner").css("display", "inline-block");
			$.ajax({
				url: `${admin}/submit-reset-password`,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					if (data.status == "success") {
						$("#resetmsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						var url = admin;
						$(location).attr('href', url);
					} else {
						$("#resetmsg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#resetmsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				}
			});
			return false;
		}
	});

	/*  UPI OTP Confirm Section Start */
	$("#OtpConfirmFrmForExcel").validate({
		rules: {
			otp_code: {
				required: true,
			}
		},
		messages: {
			otp_code: {
				required: "Please Enter Otp Code",
			}
		},
		submitHandler: function (form) {
			$("#otpSubmitBtn").attr("disabled", true);
			$("#btn_spinner_5").css("display", "inline-block");
			$.ajax({
				url: `${admin}/user-excel-export-otp-check`,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					if (data.status == "success") {
						$("#error_upi_otp").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$('#OtpConfirmFrmForExcel')[0].reset();
						window.setTimeout(function () { $('#otpCheckModal').modal('hide') }, 1500);
						var url = admin + "/get-users-excel-export";
						$(location).attr('href', url);
					} else {
						$("#error_upi_otp").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					/* setTimeout(function(){location.reload();},2000); */
					$("#btn_spinner_5").css("display", "none");
					$("#otpSubmitBtn").attr("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#error_upi_otp").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner_5").css("display", "none");
					$("#otpSubmitBtn").attr("disabled", false);
				}
			});
			return false;
		}
	});
	/* UPI OTP Confirm Section End */

	/* Add Category section start */
	$("#addCategoryFrm").validate({
		rules: {
			cat_name: {
				required: true,
				remote: {
					depends: function () {
						if ($("#old_cat_name").val() != $("#cat_name").val()) {
							return true;
						}
					},
					param: {
						url: `${admin}/check-duplicate-category-name`,
						type: "post",
					}
				},
				minlength: 2,
			},
			cat_name_hindi: {
				required: true,
				remote: {
					depends: function () {
						if ($("#old_cat_name_hindi").val() != $("#cat_name_hindi").val()) {
							return true;
						}
					},
					param: {
						url: `${admin}/check-duplicate-category-name-hindi`,
						type: "post",
					}
				}
			},
			cat_url: {
				required: true,
			},
			display_order: {
				required: true,
			},
			prof_pic: {
				required: true,
			}
		},
		messages: {
			cat_name: {
				required: "Please enter category name",
				remote: "category name already exist",
			},
			cat_name_hindi: {
				required: "Please enter category name in hindi",
				remote: "category hindi name already exist",
			},
			cat_url: {
				required: "Please enter category url",
			},
			display_order: {
				required: "Please enter display order",
			},
			prof_pic: {
				required: "Please select category icon",
			}
		},
		submitHandler: function (form) {
			$("#submitBtn").attr("disabled", true);
			$("#btn_spinner").css("display", "inline-block");
			$.ajax({
				url: `${admin}/submit-category`,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					if (data.status == "success") {
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$('#addCategoryFrm')[0].reset();
						$("#prof_pic").val("");
						$("#profile_picture").val("");
						$("#pro_pic").val("");
						$(".doc_append").html("");
						$("#pro_pic_view").attr('src', "");
						$("#pro_pic_remove").css("display", "none");
						dataTable.ajax.reload();
					} else if (data.status == "update") {
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						dataTable.ajax.reload();
						window.setTimeout(function () { $('#addCategoryModal').modal('hide') }, 2000);
					}
					else {
						$("#errormsg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#errormsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				}
			});
			return false;
		}
	});
	/* Add Category section end */

	/* Add Sub Category section start */
	$("#addSubCategoryFrm").validate({
		rules: {
			cat_id: {
				required: true,
			},
			subcat_name: {
				required: true,
				remote: {
					depends: function () {
						if ($("#old_subcat_name").val() != $("#subcat_name").val()) {
							return true;
						}
					},
					param: {
						url: `${admin}/check-duplicate-sub-category-name`,
						type: "post",
						data: {
							cat_id: function () {
								return $("#cat_id").val();
							},
							subcat_name: function () {
								return $("#subcat_name").val();
							}
						},
					}
				}
			},
			subcat_name_hindi: {
				required: true,
				remote: {
					depends: function () {
						if ($("#old_subcat_name_hindi").val() != $("#subcat_name_hindi").val()) {
							return true;
						}
					},
					param: {
						url: `${admin}/check-duplicate-sub-category-name-hindi`,
						type: "post",
						data: {
							cat_id: function () {
								return $("#cat_id").val();
							},
							subcat_name: function () {
								return $("#subcat_name_hindi").val();
							}
						},
					}
				}
			},
			subcat_url: {
				required: true,
			},
			display_order: {
				required: true,
			},
			prof_pic: {
				required: true,
			}
		},
		messages: {
			cat_id: {
				required: "Please selct category",
			},
			subcat_name: {
				required: "Please enter sub category name",
				remote: "sub category name already exist",
			},
			subcat_name_hindi: {
				required: "Please enter sub category name in hindi",
				remote: "sub category hindi name already exist",
			},
			subcat_url: {
				required: "Please enter sub category url",
			},
			display_order: {
				required: "Please enter display order",
			},
			prof_pic: {
				required: "Please select sub category icon",
			}
		},
		submitHandler: function (form) {
			$("#submitBtn").attr("disabled", true);
			$("#btn_spinner").css("display", "inline-block");
			$.ajax({
				url: `${admin}/submit-sub-category`,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					if (data.status == "success") {
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$("#subcat_name").val("");
						$("#subcat_name_hindi").val("");
						$("#subcat_url").val("");
						$("#display_order").val("");

						$("#prof_pic").val("");
						$("#profile_picture").val("");
						$("#pro_pic").val("");
						$(".doc_append").html("");
						$("#pro_pic_view").attr('src', "");
						$("#pro_pic_remove").css("display", "none");
						dataTable.ajax.reload();
					} else if (data.status == "update") {
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						dataTable.ajax.reload();
						window.setTimeout(function () { $('#addSubCategoryModal').modal('hide') }, 2000);
					}
					else {
						$("#errormsg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#errormsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				}
			});
			return false;
		}
	});
	/* Add Sub Category section end */

	/* Add Size Chart section start */
	$("#sizeChartFrm").validate({
		rules: {
			chart_name: {
				required: true,
			}
		},
		messages: {
			chart_name: {
				required: "Please enter size chart name",
			}
		},
		submitHandler: function (form) {
			const formData = []
			$('#sizeChartFrm .array-control').each(function () {
				formData.push(this.value);
			});

			$("#submitBtn").attr("disabled", true);
			$("#btn_spinner").css("display", "inline-block");
			$.ajax({
				url: `${admin}/submit-size-chart`,
				type: 'POST',
				data: { chart_id: $("#chart_id").val(), chart_name: $("#chart_name").val(), size_chart: formData },
				dataType: "json",
				success: function (data) {
					if (data.status == "success") {
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$('#sizeChartFrm')[0].reset();
						dataTable.ajax.reload();
					} else if (data.status == "update") {
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						dataTable.ajax.reload();
						window.setTimeout(function () { $('#addSizeChartModal').modal('hide') }, 2000);
					}
					else {
						$("#errormsg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#errormsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				}
			});
			return false;
		}
	});
	/* Add Size Chart section end */

	/* Add Product section start */
	$("#productFrm").validate({
		ignore: "",
		rules: {
			cat_id: {
				required: true,
			},
			sub_cat_id: {
				required: true,
			},
			product_name: {
				required: true,
				remote: {
					depends: function () {
						if ($("#old_product_name").val() != $("#product_name").val()) {
							return true;
						}
					},
					param: {
						url: `${admin}/check-duplicate-product-name`,
						type: "post",
						data: {
							cat_id: function () {
								return $("#cat_id").val();
							},
							sub_cat_id: function () {
								return $("#sub_cat_id").val();
							},
							product_name: function () {
								return $("#product_name").val();
							}
						},
					}
				}
			},
			product_name_hindi: {
				required: true,
				remote: {
					depends: function () {
						if ($("#old_product_name_hindi").val() != $("#product_name_hindi").val()) {
							return true;
						}
					},
					param: {
						url: `${admin}/check-duplicate-product-name-hindi`,
						type: "post",
						data: {
							cat_id: function () {
								return $("#cat_id").val();
							},
							sub_cat_id: function () {
								return $("#sub_cat_id").val();
							},
							product_name_hindi: function () {
								return $("#product_name_hindi").val();
							}
						},
					}
				}
			},
			product_url: {
				required: true,
			},
			display_order: {
				required: true,
			},
			/* product_mrp:{
				required:{
					depends: function(){ if($("input[name='size_chart_act']:checked").val()==2 && $("#product_mrp").val()==''){
						return true;
						} 
					},
				}
			},
			discount_rate:{
				required:{
					depends: function(){ if($("input[name='size_chart_act']:checked").val()==2 && $("#discount_rate").val()==''){
						return true;
						} 
					},
				},
				lessThanEqual:true,
			}, */
			product_mrp: {
				required: true
			},
			discount_rate: {
				required: true,
				lessThanEqual: true,
			},
			size_chart_token: {
				required: {
					depends: function () {
						if ($("input[name='size_chart_act']:checked").val() == 1 && $("#size_chart_token").val() == '') {
							return true;
						}
					},
				}
			},
			gst_rate: {
				required: true,
			},
			prof_pic: {
				required: true,
			},
			/* product_images:{
				required:true,
			}, */
			product_details: {
				required: true,
			}
		},
		messages: {
			cat_id: {
				required: "Please selct category",
			},
			sub_cat_id: {
				required: "Please selct sub category",
			},
			product_name: {
				required: "Please enter product name",
				remote: "Product name alerady exist"
			},
			product_name_hindi: {
				required: "Please enter product name in hindi",
				remote: "Product name in hindi alerady exist"
			},
			product_url: {
				required: "Please enter product url",
			},
			display_order: {
				required: "Please enter display order",
			},
			product_mrp: {
				required: "Please enter product MRP",
			},
			discount_rate: {
				required: "Please enter discount rate",
				lessThanEqual: "Discount rate should be less than or equal to MRP"
			},
			size_chart_token: {
				required: "Please select size chart",
			},
			gst_rate: {
				required: "Please enter GST rate",
			},
			prof_pic: {
				required: "Please select product icon",
			},
			/* product_images:{
				required:"Please select product images",
			}, */
			product_details: {
				required: "Please enter product description",
			}
		},
		submitHandler: function (form) {
			var form = new FormData(form)
			let size_chart_label = []
			let size_chart_mrp = []
			let size_chart_off_rate = []

			$('.array-control').each(function () {
				if ($(this).is(':checked')) {
					size_chart_label.push(this.value);
				}
			});

			$(".array-control-mrp").each(function () {
				if ($(this).val() != "")
					size_chart_mrp.push($(this).val())
			});
			$(".array-control-off").each(function () {
				if ($(this).val() != "")
					size_chart_off_rate.push($(this).val())
			});

			form.append("size_chart_label", size_chart_label)
			form.append("size_chart_mrp", size_chart_mrp)
			form.append("size_chart_off_rate", size_chart_off_rate)

			$("#submitBtn").attr("disabled", true);
			$("#btn_spinner").css("display", "inline-block");
			$.ajax({
				url: `${admin}/submit-product`,
				type: 'POST',
				data: form,
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					if (data.status == "success") {
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$("#product_name").val("");
						$("#product_name_hindi").val("");
						$("#product_url").val("");
						$("#display_order").val("");
						$("#product_mrp").val("");
						$("#discount_rate").val("");
						$("#size_chart_token").val("");
						$("#gst_rate").val("");
						$("#meta_title").val("");
						$("#meta_keywords").val("");
						$("#meta_description").val("");
						tinymce.activeEditor.setContent('');

						$("#prof_pic").val("");
						$("#profile_picture").val("");
						$("#pro_pic").val("");
						$(".doc_append").html("");
						$("#pro_pic_view").attr('src', "");
						$("#pro_pic_remove").css("display", "none");
						location.reload();
						/* dataTable.ajax.reload(); */
					} else if (data.status == "update") {
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						location.reload();
					}
					else {
						$("#errormsg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#errormsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				}
			});
			return false;
		}
	});
	/* Add Product section end */

	/* Add Coupon section start */
	$("#couponFrm").validate({
		rules: {
			coupon_code: {
				required: {
					depends: function () {
						if ($("input[name='coupon_type']:checked").val() == 1 && $("#coupon_code").val() == '') {
							return true;
						}
					},
					param: {
						url: `${admin}/check-duplicate-coupon`,
						type: "post",
					}
				},
				remote: {
					depends: function () {
						if ($("input[name='coupon_type']:checked").val() == 1 && $("#coupon_code").val() != '') {
							return true;
						}
					},
					param: {
						url: `${admin}/check-duplicate-coupon`,
						type: "post",
					}
				},
				minlength: 6,
			},

			number_coupon: {
				required: true,
			},
			discount_type: {
				required: true,
			},
			discount: {
				required: true,
			},
			min_amount: {
				required: true,
			},
			up_to_per: {
				required: {
					depends: function () {
						if ($("#discount_type").val() == 1 && $("#up_to_per").val() == '') {
							return true;
						}
					},
				}
			},
			start_date: {
				required: true
			},
			end_date: {
				required: true
			},
			coupon_details: {
				required: true
			},
		},
		messages: {
			coupon_code: {
				required: "Please enter coupon code",
				remote: "Coupon code already exist",
				minlength: "Please enter code minimum length of 6"
			},
			number_coupon: {
				required: "Please enter number of coupon",
			},
			discount_type: {
				required: "Please select discount type",
			},
			discount: {
				required: "Please enter discount",
			},
			min_amount: {
				required: "Please enter minimum amount",
			},
			up_to_per: {
				required: "Please enter UP to percentage",
			},
			start_date: {
				required: "Please select start date",
			},
			end_date: {
				required: "Please select end date",
			},
			coupon_details: {
				required: "Please coupon details",
			}
		},
		submitHandler: function (form) {
			$("#submitBtn").attr("disabled", true);
			$("#btn_spinner").css("display", "inline-block");
			$.ajax({
				url: `${admin}/submit-coupon`,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					if (data.status == "success") {
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$('#couponFrm')[0].reset();
					} else if (data.status == "update") {
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					} else {
						$("#errormsg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#errormsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				}
			});
			return false;
		}
	});
	/* Add Coupon section end */


	/* Add Change Order Status section start */
	$("#orderStatusFrm").validate({
		rules: {
			order_status: {
				required: true,
			},
			/* status_remark:{
				required:true,
			}, */
			delivery_date: {
				required: true,
			}
		},
		messages: {
			order_status: {
				required: "Please select order status",
			},
			/* status_remark:{
				required:"Please enter status remark",
			}, */
			delivery_date: {
				required: "Please select delivery date",
			}
		},
		submitHandler: function (form) {
			$("#submitBtn").attr("disabled", true);
			$("#btn_spinner").css("display", "inline-block");
			$.ajax({
				url: `${admin}/update-order-status`,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					if (data.status == "success") {
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						if ($('#change_type').val() == '1') {
							dataTable.ajax.reload();
						} else if ($('#change_type').val() == '2') {
							dataTable.ajax.reload();
							dataTable2.ajax.reload();
						} else {
							location.reload();
						}
						window.setTimeout(function () { $('#shopOrderStatusModal').modal('hide') }, 2000);
					} else {
						$("#errormsg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#errormsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				}
			});
			return false;
		}
	});
	/* Add Change Order Status section end */

	/* Admin Slider Image section start */
	$("#sliderImageFrm").validate({
		rules: {
			prof_pic: {
				required: true,
			},
			display_order: {
				required: true,
			}
		},
		messages: {
			prof_pic: {
				required: "Please Select Slider Image",
			},
			display_order: {
				required: "Please Enter Display Order",
			}
		},
		submitHandler: function (form) {
			$("#SubmitBtn").attr("disabled", true);
			$("#btn_spinner_4").css("display", "inline-block");
			$.ajax({
				url: `${admin}/submit-slider-image`,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					if (data.status == "success") {
						$("#errorValueMsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$('#sliderImageFrm')[0].reset();
						$("#prof_pic").val("");
						$("#profile_picture").val("");
						$("#pro_pic").val("");
						$(".doc_append").html("");
						$("#pro_pic_view").attr('src', "");
						$("#pro_pic_remove").css("display", "none");
						dataTable.ajax.reload();
					} else {
						$("#errorValueMsg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					/* setTimeout(function(){location.reload();},2000); */
					$("#btn_spinner_4").css("display", "none");
					$("#valueSubmitBtn").attr("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#errorValueMsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner_4").css("display", "none");
					$("#valueSubmitBtn").attr("disabled", false);
				}
			});
			return false;
		}
	});
	/* Admin Slider Image Section End */

	/* Contact Setting section start */
	$("#adminContactFrm").validate({
		ignore: "",
		rules: {
			whats_mobile: {
				required: true,
			},
			address: {
				required: true,
			}
		},
		messages: {
			whats_mobile: {
				required: "Please enter whatapp number",
			},
			address: {
				required: "Please enter address",
			}
		},
		submitHandler: function (form) {
			$("#submitBtn").attr("disabled", true);
			$("#btn_spinner").css("display", "inline-block");
			$.ajax({
				url: `${admin}/submit-contact-settings`,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					if (data.status == "success") {
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					} else if (data.status == "update") {
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					} else {
						$("#errormsg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					setTimeout(function () { location.reload(); }, 2000);
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#errormsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				}
			});
			return false;
		}
	});
	/* Contact Setting section end */

	/* Orders Report History section start */
	$("#orderReportFrm").validate({
		rules: {
			start_date: {
				required: true,
			},
			end_date: {
				required: true,
			},
			order_status: {
				required: true,
			},
		},
		messages: {
			start_date: {
				required: "Please select from date",
			},
			end_date: {
				required: "Please select to date",
			},
			order_status: {
				required: "Please select order status",
			}
		},
		submitHandler: function (form) {
			$("#submitBtn").attr("disabled", true);
			$("#btn_spinner").css("display", "inline-block");
			$("#t_withdraw_amt").html(0);
			$("#t_accept_reqts").html(0);
			$("#t_reject_reqts").html(0);
			$.ajax({
				url: `${admin}/get-order-report-data`,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data) {
					if (data.getOrderData != "") {
						if ($.fn.DataTable.isDataTable('#ordersReportList')) {
							$('#ordersReportList').DataTable().destroy();
						}
						$('#ordersReportList tbody').empty();
						var i = 1; var j = 1; var totalOrderValue = 0; var exportBtn;
						$.each(data.getOrderData, function (key, val) {
							var insert_date = moment(new Date(val.createdAt)).format('Do MMMM, YYYY');

							if (val.order_status == 0) {
								display_status = '<badge class="badge badge-info">Pending</badge>';
							} else if (val.order_status == 1) {
								display_status = '<badge class="badge badge-success">Accepted</badge>';
							} else if (val.order_status == 2) {
								display_status = '<badge class="badge badge-primary">Shipped</badge>';
							} else if (val.order_status == 3) {
								display_status = '<badge class="badge badge-warning">Out For Delivery</badge>';
							} else if (val.order_status == 4) {
								display_status = '<badge class="badge badge-success">Delivered</badge>';
							} else if (val.order_status == 5) {
								display_status = '<badge class="badge badge-danger">Rejected</badge>';
							}

							const params = new URLSearchParams({
								var1: $("#start_date").val(),
								var2: $("#end_date").val(),
								var3: $("#order_status").val(),
							});

							exportBtn = `<h4 class="card-title mg-b-0">Orders Report</h4><a class="effect-btn btn btn-primary squer-btn mr-2" href="${admin}/order-excel-export/?=&${params}" role="button">Excel Export</a>`

							var view = `<a title="View" target="_blank" href="${admin}/view-order/${val._id}"><button  class="btn btn-outline-primary btn-xs m-l-5 btn_cls" type="button">View Order</button></a>`;

							totalOrderValue = parseFloat(totalOrderValue) + parseFloat(val.grandTotal)

							$("#order_data").append(`<tr><td>${j}</td><td>${val.order_id}</td><td>${val.username} (${val.usermobile}) <a target="_blank" href="${admin}/view-user/${val.user_id._id}"><i class="fa fa-eye"></i></a></td><td>${val.transaction_id}</td><td>&#x20b9; ${val.grandTotal}</td><td>${display_status}</td><td>${insert_date}</td><td>${view}</td></tr>`);
							j++;
						});
						$("#order_details").css("display", "block");
						$("#t_order_value").html(`&#x20b9; ${totalOrderValue.toFixed(2)}`);
						$(".exportBtn").html(exportBtn);
						$('#ordersReportList').DataTable();
					} else {
						$(".exportBtn").html('<h4 class="card-title mg-b-0">Orders Report</h4>');
						$("#order_data").html("<tr><td colspan=7 class='text-center'>No Record Found</td></tr>");
					}
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR, exception);
					$("#alert_msg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display", "none");
					$("#submitBtn").attr("disabled", false);
				}
			});
			return false;
		}
	});
	/* Orders Report History section end */

});

$("select").closest("form").on("reset", function (ev) {
	var targetJQForm = $(ev.target);
	setTimeout((function () {
		this.find("select").trigger("change");
	}).bind(targetJQForm), 0);
});

function checkPassword(pass, type) {
	if (type == 2) {
		$(".progress_img_upload").css("display", "block");
	}
	var count = 0;
	if (pass.length >= 8) {
		count = count + 1;
		$("#pas_len").removeClass("fa-times error");
		$("#pas_len").addClass("fa-check success");
	}
	else {
		$("#pas_len").addClass("fa-times error");
		$("#pas_len").removeClass("fa-check success");
	}
	if (pass.match(/[a-z]/)) {
		count = count + 1;
		$("#low_lett").removeClass("fa-times error");
		$("#low_lett").addClass("fa-check success");
	} else {
		$("#low_lett").addClass("fa-times error");
		$("#low_lett").removeClass("fa-check success");
	}
	if (pass.match(/[A-Z]/)) {
		count = count + 1;
		$("#upp_lett").removeClass("fa-times error");
		$("#upp_lett").addClass("fa-check success");
	}
	else {
		$("#upp_lett").addClass("fa-times error");
		$("#upp_lett").removeClass("fa-check success");
	}
	if (pass.match(/\d/)) {
		count = count + 1;
		$("#pass_num").removeClass("fa-times error");
		$("#pass_num").addClass("fa-check success");
	}
	else {
		$("#pass_num").addClass("fa-times error");
		$("#pass_num").removeClass("fa-check success");
	}
	if (pass.match(/[!@#$%^&*()_+|*{}<>]/)) {
		count = count + 1;
		$("#spe_ch").removeClass("fa-times error");
		$("#spe_ch").addClass("fa-check success");
	} else {
		$("#spe_ch").addClass("fa-times error");
		$("#spe_ch").removeClass("fa-check success");
	}
	if (count == 0) {
		$(".pass_bar").html('<div class="progress pro_cls"><div class="progress-bar bg-danger red_bar" style="width:0%"></div><div class="progress-bar bg-warning orange_bar" style="width:0%"></div><div class="progress-bar bg-success green_bar" style="width:0%"></div></div>');
	}
	if (count >= 1) {
		$(".pass_bar").html('<div class="progress pro_cls"><div class="progress-bar bg-danger red_bar" style="width:10%"></div><div class="progress-bar bg-warning orange_bar" style="width:0%"></div><div class="progress-bar bg-success green_bar" style="width:0%"></div></div>');
	} if (count >= 2) {
		$(".pass_bar").html('<div class="progress pro_cls"><div class="progress-bar bg-danger red_bar" style="width:30%"></div><div class="progress-bar bg-warning orange_bar" style="width:0%"></div><div class="progress-bar bg-success green_bar" style="width:0%"></div></div>');
	} if (count >= 3) {
		$(".pass_bar").html('<div class="progress pro_cls"><div class="progress-bar bg-danger red_bar" style="width:30%"></div><div class="progress-bar bg-warning orange_bar" style="width:10%"></div><div class="progress-bar bg-success green_bar" style="width:0%"></div></div>');
	} if (count >= 4) {
		$(".pass_bar").html('<div class="progress pro_cls"><div class="progress-bar bg-danger red_bar" style="width:30%"></div><div class="progress-bar bg-warning orange_bar" style="width:30%"></div><div class="progress-bar bg-success green_bar" style="width:0%"></div></div>');
	} if (count >= 5) {
		$(".pass_bar").html('<div class="progress pro_cls"><div class="progress-bar bg-danger red_bar" style="width:30%"></div><div class="progress-bar bg-warning orange_bar" style="width:30%"></div><div class="progress-bar bg-success green_bar" style="width:40%"></div></div>');
	}
}