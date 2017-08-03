'use strict';
const core = require('./alipay_core_function');

const Alipay = {};
//1、生成form
Alipay.pay = (config, cb) => {
	let param = core.createRequestForm(config);
	return cb(param);
};
//2、同步验签
Alipay.verifyResponse = (obj, cb) => {
	let result = core.verifyResponse(obj);
	return cb(result);
};
//3、异步验签
Alipay.verifyNotify = (obj, cb) => {
	let result = core.verifyNotify(obj);
	return cb(result);
};
module.exports = Alipay;