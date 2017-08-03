'use strict';
const crypto = require('crypto');
const api_list = require('../config').config.api_list;
/*
	==============================================================
	===========================tools==============================
	==============================================================
*/
Date.prototype.format = function(fmt) {
	var o = {
		'M+': this.getMonth() + 1, //月份 
		'd+': this.getDate(), //日 
		'h+': this.getHours(), //小时 
		'm+': this.getMinutes(), //分 
		's+': this.getSeconds(), //秒 
		'q+': Math.floor((this.getMonth() + 3) / 3), //季度 
		'S': this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
		}
	}
	return fmt;
};
// 0、检测参数缺失
const detectConfig = (obj) => {
	if (!obj) {
		return '参数';
	}
	// 公共参数
	for (let i = 0; i < api_list.publicParam.length; i++) {
		if (!obj[api_list.publicParam[i]]) {
			return api_list.publicParam[i];
		}
	}
	// 请求参数
	for (let i = 0; i < api_list[obj.method].length; i++) {
		if (typeof api_list[obj.method][i] === 'object') {
			let paramExist = 0;
			for (let j = 0; j < api_list[obj.method][i].length; j++) {
				if (obj.biz_content[api_list[obj.method][i][j]]) {
					paramExist = 1;
					break;
				}
			}
			if (!paramExist) {
				return api_list[obj.method][i].join(' 或 ');
			}
		}
		if (!obj.biz_content[api_list[obj.method][i]] && typeof api_list[obj.method][i] !== 'object') {
			return api_list[obj.method][i];
		}
	}
};
// 1、检测和生成完整请求参数
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
		// timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
		timestamp: new Date().format("yyyy-MM-dd hh:mm:ss"),
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

// 3、生成sign并返回生成请求参数
const createRequestParam = (obj) => {
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
	let rsa_type = (alipayConfig.alipayConfig.sign_type === 'RSA') ? 'RSA-SHA1' : 'RSA-SHA256';
	let sign = crypto.createSign(rsa_type).update(pre_sign).sign(privateKey, 'base64');
	param += `sign=${encodeURIComponent(sign)}`;
	return {
		param: param,
		biz_content: alipayConfig.alipayConfig.biz_content
	};
};

/*
	==============================================================
	===========================cores==============================
	==============================================================
*/
const core = {};
// 1、生成表单
core.createRequestForm = (obj) => {
	let param = createRequestParam(obj);
	let formStart = `<form id='pay' name='pay' action='https://openapi.alipaydev.com/gateway.do?${param.param}' method='post'>`;
	let content = `<input type='hidden' name='biz_content' value='${JSON.stringify(param.biz_content)}'> `;
	let formEnd = `</form>`;
	let submitJs = `<script>document.forms['pay'].submit();</script>`;
	let form = formStart + content + formEnd + submitJs;
	return form;
};
// 2、前台回跳验证
core.verifyResponse = (obj) => {
	if (!obj || !obj.publicKey || !obj.response) {
		let err = new Error('参数不完整');
		throw err;
	}
	let publicKey = obj.publicKey;
	let response = obj.response;
	try {
		if (typeof response === 'string') {
			response = JSON.parse(response);
		}
		if (!response.sign) {
			let err = new Error('没有可验证的sign');
			throw err;
		}
	} catch (err) {
		throw err;
	}
	let sign = response.sign;
	let param = '';
	for (let i in response) {
		if (i !== 'sign') {
			param = (JSON.stringify(response[i])).replace(/\//g, '\\\/');
		}
	}
	let rsa_type = (obj.sign_type && obj.sign_type === 'RSA') ? 'RSA-SHA1' : 'RSA-SHA256';
	var verify = crypto.createVerify(rsa_type).update(param).verify(publicKey, sign, 'base64');
	return verify;
};
// 3、异步同步验签 
core.verifyReturn = (obj) => {
	if (!obj || !obj.publicKey || !obj.response) {
		let err = new Error('参数不完整');
		throw err;
	}
	let publicKey = obj.publicKey;
	let response = obj.response;
	if (typeof response === 'string') {
		response = JSON.parse(response);
	}
	let sign = response.sign;
	response = sortConfig(response);
	let param = '';
	for (let i in response) {
		if (i === 'sign' || i === 'sign_type') {
			continue;
		} else if (typeof response[i] === 'object') {
			param += `${i}=${decodeURIComponent((JSON.stringify(response[i])).replace(/\//g, '\\\/'))}&`;
		} else {
			param += `${i}=${decodeURIComponent(response[i])}&`;
		}
	}
	param = param.substring(0, param.length - 1);
	let rsa_type = (response.sign_type === 'RSA') ? 'RSA-SHA1' : 'RSA-SHA256';
	var verify = crypto.createVerify(rsa_type).update(param).verify(publicKey, sign, 'base64');
	return verify;
};
module.exports = core;