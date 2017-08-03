# alipay_api

## 新版支付宝API

****************************************************************************************

### 手机网页支付和网页支付demo

****************************************************************************************
#### 使用:

```
		npm install alipay_api
```

##### 1、发起支付:

```
		函数: pay
			 const pay = require('alipay_api').pay;
		参数:
			let obj = {
				env: 'dev', // 沙盒还是正式环境: dev or product (默认:dev)
				app_id: 'xxxxxxxxxxxxxxxx', // app_id : (必填)
				method: 'alipay.trade.page.pay', // 接口名称: 支持网页支付和手机网页支付及交易辅助接口(必填)
				charset: 'utf-8', // (默认:utf-8)
				sign_type: 'RSA2', // (默认:RSA2)
				timestamp: moment().format('YYYY-MM-DD HH:mm:ss'), // (默认:当前时间)
				version: '1.0', // (默认:version: '1.0')
				biz_content: { // 请求参数: (必填:具体参数看文档)
				},
				privateKey:'dsadsad', // 私钥:(必填)
			};
			pay(obj,callback)
			返回值: 一个表单
```

#### 2、前台回跳验证

```
		函数: verifyResponse
			 const verifyResponse = require('alipay_api').verifyResponse;
		参数: 
			let obj = {
				publicKey: 'xxxxxxxxxxxxxxxxxxxxxxx', // 阿里的公钥: (必填)
				response: { //(必填)
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
			verifyResponse(obj,callback)
			返回值: true/false
```

#### 3、异步同步验签

```
		函数: verifyReturn
			 const verifyReturn = require('alipay_api').verifyReturn;
		参数: 
			let obj = {};
			obj.response = { <======同步异步返回值: (必填)
				gmt_create: '2017-08-03 10:59:13',
				charset: 'utf-8',
				seller_email: 'hehdtl1351@sandbox.com',
				subject: 'test',
				sign: 'LOeN580qy97EI6Bf1UvcneTwsLLfGd4HJp4+gGPEpWfIQj93JRVSrdDLO5KQKeVfQbt7I99IlNYpE3k/sjSFvy+39YD1Z30WUxJgFJrC8yG8XOYe+v17JwQSwIvYWiPxhd0xITRH/Xr4G1wkO3NmdBB+5fUgv9zvH9X+Tk4jwdDXPReZ/dHg28wAWlX0JYcbhPNTRw3wTZspgOIBEZ59kkj2rYnk8uAm7dz2bFXS/T0keVek4P3Brk8BB8aEal1lYtDUWWWaLlMPMzrflSaZWA/t8XqOT+7PkU0dHUIq0HqV2lOhsNj5JWwRktFS75dZoblgtuQnLel0lu5BHuGuHA==',
				buyer_id: '2088102169911215',
				invoice_amount: '0.01',
				notify_id: '6adbe82e9086075f70e17db1566cd45hme',
				fund_bill_list: '[{"amount":"0.01","fundChannel":"ALIPAYACCOUNT"}]',
				notify_type: 'trade_status_sync',
				trade_status: 'TRADE_SUCCESS',
				receipt_amount: '0.01',
				app_id: '2016073100132509',
				buyer_pay_amount: '0.01',
				sign_type: 'RSA2',
				seller_id: '2088102169284526',
				gmt_payment: '2017-08-03 10:59:14',
				notify_time: '2017-08-03 10:59:15',
				version: '1.0',
				out_trade_no: '20150320010101006',
				total_amount: '0.01',
				trade_no: '2017080321001004210200152988',
				auth_app_id: '2016073100132509',
				buyer_logon_id: 'uxu***@sandbox.com',
				point_amount: '0.00'
			};
			obj.publicKey = 'xxxxxx'; // 阿里的公钥: (必填)
			verifyReturn(obj,callback)
			返回值: true/false
```
****************************************************************************************
有问题欢迎交流哈~
