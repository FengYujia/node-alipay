'use strict';
//=================
const moment = require('moment');
const fs = require('fs');
const alipay = require('../index.js').Alipay;
try {
	let obj = {
		env: 'https://openapi.alipaydev.com/gateway.do?',
		app_id: '2016073100132509', //合作身份者id，以2088开头的16位纯数字
		method: 'alipay.trade.pay',
		charset: 'utf-8',
		sign_type: 'RSA2',
		format: 'JSON',
		timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
		version: '1.0',
		biz_content: {
			out_trade_no: 'ALIPAYTEST2016081622560194853',
			scene: 'bar_code',
			auth_code: '2016073100132509',
			subject: 'test',
			total_amount: '0.01'
		}
	};
	obj.rsaKey = fs.readFileSync('./key/app_private_key.pem').toString();
	alipay(obj, (result) => {
		console.log(result.body);
	});
} catch (e) {
	console.log(e);
}