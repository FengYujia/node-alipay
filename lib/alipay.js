'use strict';
const core = require('./alipay_core_function');

const Alipay = {};
//1、生成form
Alipay.pay = (config, cb) => {
	let param = core.createRequestForm(config);
	return cb(param);
};
//2、前台回跳验证
Alipay.verifyResponse = (obj, cb) => {
	let result = core.verifyResponse(obj);
	return cb(result);
};
//3、异步同步验签
Alipay.verifyReturn = (obj, cb) => {
	let result = core.verifyReturn(obj);
	return cb(result);
};
module.exports = Alipay;