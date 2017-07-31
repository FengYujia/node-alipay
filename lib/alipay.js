'use strict';
const env_config = require('../config').config;
const core = require('./alipay_core_function');
const fs = require('fs');

const Alipay = (config, cb) => {
	//1、检测和生成参数
	let alipayConfig = core.defaultConfig(config);

	//2、排序参数
	alipayConfig.alipayConfig = core.sortConfig(alipayConfig.alipayConfig);

	//3、生成sign并返回生成请求参数
	let param = core.createParam(alipayConfig);
	
	//
	let url = (env_config[config.env] ? env_config[config.env].url : env_config.dev.url) + param.trim();
	require('needle').get(url, (err, response) => {
		if (err) {
			throw err;
		}
		return cb(response);
	});
};


exports.Alipay = Alipay;