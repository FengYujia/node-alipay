'use strict';
const moment = require('moment');
const crypto = require('crypto');
const param = require('../config').config.param;
/*
	===========================tools==============================
*/
// 0、检测参数缺失
const detectConfig = (obj) => {
	if (!obj) {
		return '参数';
	}
	// 公共参数
	for (let i = 0; i < param.publicParam.length; i++) {
		if (!obj[param.publicParam[i]]) {
			return param.publicParam[i];
		}
	}
	// 请求参数
	for (let i = 0; i < param[obj.method].length; i++) {
		if (typeof param[obj.method][i] === 'object') {
			let paramExist = 0;
			for (let j = 0; j < param[obj.method][i].length; j++) {
				if (obj.biz_content[param[obj.method][i][j]]) {
					paramExist = 1;
					break;
				}
			}
			if (!paramExist) {
				return param[obj.method][i].join(' 或 ');
			}
		}
		if (!obj.biz_content[param[obj.method][i]] && typeof param[obj.method][i] !== 'object') {
			return param[obj.method][i];
		}
	}
};
// 1、检测和生成参数
const defaultConfig = (obj) => {
	let detectRes = detectConfig(obj);
	if (detectRes) {
		let err = new Error(detectRes + '不能为空');
		throw err;
	}

	let config = {};
	config.privateKey = obj.privateKey;
	config.publicKey = obj.publicKey;
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
		if (i === 'privateKey' || i === 'publicKey') {
			continue;
		}
		config.alipayConfig[i] = obj[i];
	}
	return config;
};
// 2、排序参数
const sortConfig = (obj) => {
	let res = {};
	let keys = Object.keys(obj).sort();
	for (let i = 0; i < keys.length; i++) {
		res[keys[i]] = obj[keys[i]];
	}
	return res;
};
/*
	===========================cores==============================
*/
const core = {};
// 0、生成sign并返回生成请求参数
core.createRequestParam = (obj) => {
	//1、检测和生成参数
	let alipayConfig = defaultConfig(obj);
	//2、排序参数
	alipayConfig.alipayConfig = sortConfig(alipayConfig.alipayConfig);
	//3、处理sign
	let param = '';
	let pre_sign = '';
	for (let i in alipayConfig.alipayConfig) {
		if (typeof alipayConfig.alipayConfig[i] === 'object') {
			pre_sign += `${i}=${JSON.stringify(alipayConfig.alipayConfig[i])}&`;
			param += `${i}=${JSON.stringify(alipayConfig.alipayConfig[i])}&`;
		} else {
			pre_sign += `${i}=${alipayConfig.alipayConfig[i]}&`;
			param += `${i}=${encodeURIComponent(alipayConfig.alipayConfig[i])}&`;
		}
	}
	pre_sign = pre_sign.substring(0, pre_sign.length - 1);
	let privateKey = alipayConfig.privateKey;
	let sign = crypto.createSign('RSA-SHA256').update(pre_sign).sign(privateKey, 'base64');
	param += `sign=${encodeURIComponent(sign)}`;
	return param;
};
// 1、 同步验签
core.verifyResponse = (config, response) => {
	response = JSON.parse(response);
	let publicKey = config.publicKey;
	let sign = response.sign;

	let param = '';
	for (let i in response) {
		if (i !== 'sign') {
			param = (JSON.stringify(response[i])).replace(/\//g, '\\\/');
		}
	}
	var verify = crypto.createVerify('RSA-SHA256').update(param).verify(publicKey, sign, 'base64');
	response.verify = verify ? '验签通过' : '验签失败';
	return response;
};
// 2、异步验签 : TODO
core.verifyNotify = (config, response) => {
	response = JSON.parse(response);
	let publicKey = config.publicKey;
	let sign = response.sign;

	let param = '';
	for (let i in response) {
		if (i !== 'sign') {
			param = (JSON.stringify(response[i])).replace(/\//g, '\\\/');
		}
	}
	var verify = crypto.createVerify('RSA-SHA256').update(param).verify(publicKey, sign, 'base64');
	response.verify = verify ? '验签通过' : '验签失败';
	return response;
};

module.exports = core;