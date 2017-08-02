'use strict';
//=================
const fs = require('fs');
const alipay = require('../index.js').pay;
const aux_pay = require('../index.js').aux_pay;

//=================
try {
	console.log(alipay)
	let obj = { // <=====测试只选部分必填参数
		env: 'dev', // 沙盒还是正式环境
		app_id: '2016073100132509', // app_id : 必填
		method: 'alipay.trade.page.pay', // 方法: 必填
		charset: 'utf-8', // 默认:utf-8
		sign_type: 'RSA2', // 默认:RSA2
		version: '1.0',
		biz_content: { // 请求参数: 必填
			out_trade_no: 'ALIPAYTEST2016081622560194853',
			subject: 'test',
			total_amount: '0.01',
			product_code:'aaaaaa'
		}
	};
	obj.privateKey = fs.readFileSync('./key/app_private_key.pem').toString(); // 私钥: 必填
	alipay(obj, (result) => {
		console.log('>>>>>',result);
	});
} catch (e) {
	console.log(e);
}