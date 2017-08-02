'use strict';
const core = require('./alipay_core_function');

const Alipay = {};
Alipay.pay = (config, cb) => {
	//1、生成form
	let param = core.createRequestForm(config);
	return cb(param);
};
Alipay.verifyResponse = (obj, cb) => {
	//2、同步验签
	let result = core.verifyResponse(obj);
	return cb(result);
};
Alipay.verifyNotify = (obj, cb) => {
	//3、异步验签 : TODO
	let result = core.verifyNotify(obj);
	return cb(result);
};
module.exports = Alipay;