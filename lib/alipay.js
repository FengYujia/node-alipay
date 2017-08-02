'use strict';
const env_config = require('../config').config;
const core = require('./alipay_core_function');
const fs = require('fs');

const Alipay = (config, cb) => {
	//1、生成sign并返回生成请求参数
	let param = core.createRequestForm(config);
	//2、发起请求
	return cb(param);
};


exports.Alipay = Alipay;