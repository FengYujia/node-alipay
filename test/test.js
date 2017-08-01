'use strict';
//=================
const moment = require('moment');
const fs = require('fs');
const alipay = require('../index.js').Alipay;

//=================
try {
	let obj = { // <=====测试只选部分必填参数
		env: 'dev', // 沙盒还是正式环境
		app_id: '2016073100132509', // app_id : 必填
		method: 'alipay.trade.pay', // 方法: 必填
		charset: 'utf-8', // 默认:utf-8
		sign_type: 'RSA2', // 默认:RSA2
		timestamp: moment().format('YYYY-MM-DD HH:mm:ss'), // 默认当前时间
		version: '1.0',
		biz_content: { // 请求参数: 必填
			out_trade_no: 'ALIPAYTEST2016081622560194853',
			scene: 'bar_code',
			auth_code: '2016073100132509',
			subject: 'test',
			total_amount: '0.01'
		}
	};
	obj.privateKey = fs.readFileSync('./key/app_private_key.pem').toString(); // 私钥: 必填
	obj.publicKey = fs.readFileSync('./key/app_public_key.pem').toString(); // 公钥: 必填
	alipay(obj, (result) => {
		console.log(result.body);
	});
} catch (e) {
	console.log(e);
}