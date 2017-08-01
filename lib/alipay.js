'use strict';
const env_config = require('../config').config;
const core = require('./alipay_core_function');
const fs = require('fs');

const Alipay = (config, cb) => {
	//1、生成sign并返回生成请求参数
	let param = core.createRequestParam(config);
	//2、发起请求
	let url = (env_config[config.env] ? env_config[config.env].url : env_config.dev.url);
	url += param.trim();
	require('needle').get(url, (err, response) => {
		if (err) {
			throw err;
		}
		let reply = core.verifyResponse(config, response.body);
		console.log('>>>>>>reply',reply);
	});
};


exports.Alipay = Alipay;