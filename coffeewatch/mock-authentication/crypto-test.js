var CryptoJS = require("crypto-js");
console.log(CryptoJS.HmacSHA256("AUTHENTICATED", CryptoJS.SHA256("test")).toString());