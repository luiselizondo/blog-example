var crypto = require("crypto")
	, assert = require('assert')
	, include = require("includemvc")
	, config = include.path("config", "config.json");

/**
 * OPtions
 * { algorithm
 * secretKey }
 */
function Secure(options) {
	var self = this;

	self.algorithm = "aes256" || options.algorithm;
	self.secretKey = config.secretKey || options.secretKey;
}

Secure.prototype.encrypt = function(plainText) {
	var self = this;
	var cipher = crypto.createCipher(self.algorithm, self.secretKey);
	return cipher.update(plainText, "utf8", "hex") + cipher.final("hex");
}

Secure.prototype.decrypt = function(encryptedText) {
	var self = this;
	var decipher = crypto.createDecipher(self.algorithm, self.secretKey);
	return decipher.update(encryptedText, "hex", "utf8") + decipher.final("utf8");
}

Secure.prototype.isEqual = function(plainText, encryptedText) {
	var self = this;
	var encrypt = self.encrypt(plainText);

	if(encrypt === encryptedText) {
		return true;
	}
	else {
		return false;
	}
}

module.exports = Secure;