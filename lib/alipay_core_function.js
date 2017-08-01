'use strict';
const moment = require('moment');
const crypto = require('crypto');
const publicParam = require('../config').config.param.publicParam;


const core = {};

/*
	0、检测参数缺少
*/
const detectConfig = (obj) => {
	if (!obj) {
		return '参数';
	}
	console.log(publicParam, '<<<<<');
	for (let i = 0; i < publicParam.length; i++) {
		if (!obj[publicParam[i]]) {
			return publicParam[i];
		}
	}
};

/*
	1、检测和生成参数
*/
core.defaultConfig = (obj) => {
	let detectRes = detectConfig(obj);
	if (detectRes) {
		let err = new Error(detectRes + '不能为空');
		throw err;
	}
	
	let config = {};
	config.rsaKey = obj.rsaKey;
	config.method = obj.method;
	config.server = obj.server;

	config.alipayConfig = {
		app_id: obj.app_id,
		method: obj.method,
		charset: obj.charset || 'utf-8',
		sign_type: obj.sign_type || 'RSA2',
		timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
		version: '1.0',
		biz_content: obj.biz_content
	};
	for (let i in obj) {
		if (i === 'rsaKey') {
			continue;
		}
		config.alipayConfig[i] = obj[i];
	}
	return config;
};

/*
	2、排序参数
*/
core.sortConfig = (obj) => {
	let res = {};
	let keys = Object.keys(obj).sort();
	for (let i = 0; i < keys.length; i++) {
		res[keys[i]] = obj[keys[i]];
	}
	return res;
};

/*
	3、生成sign并返回生成请求参数
*/
core.createParam = (obj) => {
	let param = '';
	let pre_sign = '';
	for (let i in obj.alipayConfig) {
		if (typeof obj.alipayConfig[i] === 'object') {
			pre_sign += `${i}=${JSON.stringify(obj.alipayConfig[i])}&`;
			param += `${i}=${JSON.stringify(obj.alipayConfig[i])}&`;
		} else {
			pre_sign += `${i}=${obj.alipayConfig[i]}&`;
			param += `${i}=${encodeURIComponent(obj.alipayConfig[i])}&`;
		}
	}
	pre_sign = pre_sign.substring(0, pre_sign.length - 1);
	var privateKey = obj.rsaKey;
	var sign = crypto.createSign('RSA-SHA256').update(pre_sign).sign(privateKey, 'base64');
	param += `sign=${encodeURIComponent(sign)}`;
	return param;
};

module.exports = core;