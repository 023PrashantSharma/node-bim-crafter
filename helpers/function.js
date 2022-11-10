const crypto = require("crypto");
const http = require("https");
const axios = require("axios")
const date = require('date-and-time')
var moment = require("moment");
const auth_key = "@993sjdsf7fgsjsfs7fgsf(shoppingApp)30sn^ddsjfs88nf473jfs";
const specialNumber = ["9988554433","9977332211","9944332211","9966332211","9955332211"]

module.exports = {
    sendSms: (message, mobile) => {
        var options = {
            "method": "GET",
            "hostname": "2factor.in",
            "port": null,
            "path": `/API/V1/46882ac9-80b8-11eb-a9bc-0200cd936042/SMS/${mobile}/${message}`,
            "headers": {}
        };
          
        var req = http.request(options, function (res) {
            var chunks = [];
          
            res.on("data", function (chunk) {
              chunks.push(chunk);
            });
          
            res.on("end", function () {
              var body = Buffer.concat(chunks);
              console.log(body.toString());
            });
        });
        req.end();
    },

    randomString: function (len) {
        charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
    },

    randomAlphaString: function (len) {
        /* charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; */
        charSet = 'DEFGHIJKLMNOPQRSTUVWdefghijklmnopqrstuvw';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
    },

    couponCode: function (len) {
        charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
    },

    changeAlphaString: function (text,n) {
        var text = ''+text+''
        var array = text.split('');
        var changeString='';
        for (var i = 0; i < array.length; i++) {
            var assci = array[i].charCodeAt(0);
            var new_number = parseInt(assci)+parseInt(n)
            if(assci >= 97 && assci <= 122){
                if(new_number > 122){
                    var extra = parseInt(new_number) - parseInt(122);
                    var final = parseInt(96)+parseInt(extra);
                    var changeString = changeString+String.fromCharCode(final);
                }else{
                    var changeString = changeString+String.fromCharCode(new_number);
                }
            }else{
                if(new_number > 90){
                    var extra = parseInt(new_number) - parseInt(90);
                    var final = parseInt(64)+parseInt(extra);
                    var changeString = changeString+String.fromCharCode(final);
                }else{
                    var changeString = changeString+String.fromCharCode(new_number);
                }
            }
        }
        return changeString;
    },

    EncrptDecryptApiData: (text, key, type) => {
        /* key = 'rbfgkmkuyickqrzpawcuuveaeiizetdr' */
        if (type.toString() === 'encrypt') {
            /* var cipher = crypto.createCipheriv('aes-256-ebc', key, null);
            var encrypted = cipher.update(text, 'utf8', 'base64') + cipher.final('base64'); // encrypted text
            return encrypted.toString(); */
            const cipher = crypto.createCipheriv("aes-256-ecb", key, null);
            var encrypted = cipher.update(text, 'utf8', 'base64') + cipher.final('base64'); // encrypted text
            return encrypted;
        } else {
            try {
                var decipher = crypto.createDecipheriv("aes-256-ecb", key, null);
                var decrypted = decipher.update(text, 'base64', 'utf8') + decipher.final('utf8');
                var object = JSON.parse(decrypted);
                return object;
            }
            catch {
               return false
            }
            /*  var decipher = crypto.createDecipheriv('aes-256-ebc', key, null);
             var decrypted = decipher.update(text.toString(), 'base64', 'utf8') + decipher.final('utf8'); //decrypted text
             return decrypted.toString(); */
        }
    },

    EncrptDecryptMobileNumber: (text, type) => {
        var key = 'SikUraRcgqzJiJwdglADqjNkermhseKE'
        if (type.toString() === 'encrypt') {
            const cipher = crypto.createCipheriv("aes-256-ecb", key, null);
            var encrypted = cipher.update(text, 'utf8', 'base64') + cipher.final('base64'); // encrypted text
            return encrypted;
        } else {
            try {
                var decipher = crypto.createDecipheriv("aes-256-ecb", key, null);
                var decrypted = decipher.update(text, 'base64', 'utf8') + decipher.final('utf8');
                var object = JSON.parse(decrypted);
                return object;
            }
            catch {
               return false
            }
        }
    },

    crypto: function (text, type) {
        var algorithm = 'aes-192-cbc';
        var password = 'DarkWorldEncryption';
        var key = crypto.scryptSync(password, 'salt', 24, { N: 1024 }); //create key
        var iv = crypto.scryptSync(password, 'salt', 16, { N: 1024 }); //create initVector
        
        if (type.toString() === 'encrypt') {
            var cipher = crypto.createCipheriv(algorithm, key, iv);
            var encrypted = cipher.update(text.toString(), 'utf8', 'hex') + cipher.final('hex'); // encrypted text
            return encrypted.toString();
        } else {
            var decipher = crypto.createDecipheriv(algorithm, key, iv);
            var decrypted = decipher.update(text.toString(), 'hex', 'utf8') + decipher.final('utf8'); //decrypted text
            return decrypted.toString();
        }
    },

    checkRequestAuth:function(app_key){
        var key = 'qwertyuiopasdfgh';
        var enc_key = 'F636BD475BDE0CB691146365F7FF0B2946BBB8FFEA2C9CB493CF169FB1E490457A2CA40F7C1D34EDF1E4EED6401677917342B667ED368287B278B93FC2167466';
        var decipher = crypto.createDecipheriv("aes-128-ecb", key, null);
        var check_key = decipher.update(app_key, 'hex', 'utf8') + decipher.final('utf8'); 
        console.log(check_key);
        
        if(check_key == auth_key){
            return true
        }else{
            return false
        }
    },

    getOtp:function(length){
        /* return 1234; */
        if(length == 4){
            return Math.floor(1000 + Math.random() * 9000);
        }else{
            return Math.floor(100000 + Math.random() * 900000);
        }
    },

    getCheckApiDataBefore:function(reqkey,reqdata){
        var mykey = reqkey.match(/.{1,8}/g)
        var myKey1 = this.changeAlphaString(mykey[1],3) 
        var myKey2 = this.changeAlphaString(mykey[3],3) 
        var original_key = mykey[0]+myKey1+mykey[2]+myKey2
        var decData = this.EncrptDecryptApiData(reqdata,original_key,'decrypt');
        return decData;
    },

    sendPushNotifications: function (title,messages){
        var data = { 
            app_id: process.env.ONESIGNAL_APPID,
            headings: {"en": title},
            contents: {"en": messages},
            included_segments: ["Subscribed Users"]
        };
        
        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": process.env.ONESIGNAL_AUTHKEY
        };
        
        var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };
        
        var https = require('https');
        var req = https.request(options, function(res) {  
                res.on('data', function(data) {
                console.log("Response:");
                console.log(JSON.parse(data));
            });
        });
        
        req.on('error', function(e) {
            console.log("ERROR:");
            console.log(e);
        });
        
        req.write(JSON.stringify(data));
        req.end();
        return true;
    },

    sendNotificationsOnPlayerId: function (title,messages,playerIds){
        var data = { 
            app_id: process.env.ONESIGNAL_APPID,
            headings: {"en": title},
            contents: {"en": messages},
            include_player_ids: playerIds
        };
        
        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": process.env.ONESIGNAL_AUTHKEY
        };
        
        var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };
        
        var https = require('https');
        var req = https.request(options, function(res) {  
                res.on('data', function(data) {
                console.log("Response:");
                console.log(JSON.parse(data));
            });
        });
        
        req.on('error', function(e) {
            console.log("ERROR:");
            console.log(e);
        });
        
        req.write(JSON.stringify(data));
        req.end();
        return true;
    }
}