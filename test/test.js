'use strict';
//=================
const fs = require('fs');
const alipay = require('../index.js').pay;
const verifyResponse = require('../index.js').verifyResponse;
const verifyNotify = require('../index.js').verifyNotify;

//1、 =================API调起测试
// let obj = { // <=====测试只选部分必填参数
// 	env: 'dev', // 沙盒还是正式环境
// 	app_id: '2016073100132509', // app_id : 必填
// 	method: 'alipay.trade.page.pay', // 方法: 必填
// 	charset: 'utf-8', // 默认:utf-8
// 	sign_type: 'RSA2', // 默认:RSA2
// 	version: '1.0',
// 	biz_content: { // 请求参数: 必填
// 		out_trade_no: 'ALIPAYTEST2016081622560194853',
// 		subject: 'test',
// 		total_amount: '0.01',
// 		product_code: 'aaaaaa'
// 	}
// };
// obj.privateKey = fs.readFileSync('./key/app_private_key.pem').toString(); // 私钥: 必填
// alipay(obj, (result) => {
// 	console.log('>>>>>', result);
// });

//2、 =================同步验证测试
let obj = {
	publicKey: fs.readFileSync('./key/alipay_pub.pem').toString(), // 阿里的公钥: 必填
	response: {
		alipay_trade_query_response: {
			code: "40004",
			msg: "Business Failed",
			sub_code: "ACQ.TRADE_NOT_EXIST",
			sub_msg: "交易不存在",
			buyer_pay_amount: "0.00",
			invoice_amount: "0.00",
			out_trade_no: "20150320010101001",
			point_amount: "0.00",
			receipt_amount: "0.00"
		},
		sign: "X+LacDVFaEjywgNCY4lFQyD26/5c2kzCosUa+1OEO54RYXgPxKTl+loUHt18EUnZQlun0csVK3NTMx7QTWddN1PiMlLHIcUaYSOj6KkhGfUkFLfIgQYlwhUGmkswNvw+VhaLraE/cDFLif1hLCpdEA1qB9rEwzvDbH1DEB7TWb1WfFGc7T+YLQW+pTDj8qSY37zw38fgemzGFiAzMuPKEp9esnyCWDGtz4LlzCTaRGHU8AIj52v8mK1vH+t+zKb128bNkdAZJEIDSKdpkl+KWXLaMrLpR0IqGSsLU/FyXSz2Wrd7PE4ys84hfErxDVlS7X6W7sELXcS1a5eao2dfUg=="
	}
};
verifyResponse(obj, (result) => {
	console.log(result);
});
//2、 =================notify验证测试
// let obj = {};
// obj.response = {
// 	gmt_create: '2017-08-03 10:59:13',
// 	charset: 'utf-8',
// 	seller_email: 'hehdtl1351@sandbox.com',
// 	subject: 'test',
// 	sign: 'LOeN580qy97EI6Bf1UvcneTwsLLfGd4HJp4+gGPEpWfIQj93JRVSrdDLO5KQKeVfQbt7I99IlNYpE3k/sjSFvy+39YD1Z30WUxJgFJrC8yG8XOYe+v17JwQSwIvYWiPxhd0xITRH/Xr4G1wkO3NmdBB+5fUgv9zvH9X+Tk4jwdDXPReZ/dHg28wAWlX0JYcbhPNTRw3wTZspgOIBEZ59kkj2rYnk8uAm7dz2bFXS/T0keVek4P3Brk8BB8aEal1lYtDUWWWaLlMPMzrflSaZWA/t8XqOT+7PkU0dHUIq0HqV2lOhsNj5JWwRktFS75dZoblgtuQnLel0lu5BHuGuHA==',
// 	buyer_id: '2088102169911215',
// 	invoice_amount: '0.01',
// 	notify_id: '6adbe82e9086075f70e17db1566cd45hme',
// 	fund_bill_list: '[{"amount":"0.01","fundChannel":"ALIPAYACCOUNT"}]',
// 	notify_type: 'trade_status_sync',
// 	trade_status: 'TRADE_SUCCESS',
// 	receipt_amount: '0.01',
// 	app_id: '2016073100132509',
// 	buyer_pay_amount: '0.01',
// 	sign_type: 'RSA2',
// 	seller_id: '2088102169284526',
// 	gmt_payment: '2017-08-03 10:59:14',
// 	notify_time: '2017-08-03 10:59:15',
// 	version: '1.0',
// 	out_trade_no: '20150320010101006',
// 	total_amount: '0.01',
// 	trade_no: '2017080321001004210200152988',
// 	auth_app_id: '2016073100132509',
// 	buyer_logon_id: 'uxu***@sandbox.com',
// 	point_amount: '0.00'
// };
// obj.publicKey = fs.readFileSync('./key/alipay_pub.pem').toString();
// verifyNotify(obj, (result) => {
// 	console.log(result);
// });