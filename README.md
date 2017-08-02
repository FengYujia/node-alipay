# node-alipay

## 新版支付宝API

****************************************************************************************

### 手机网页支付和网页支付demo

****************************************************************************************
```
	使用:
		1、发起支付:
			函数: pay
				 const pay = require('node-alipay').pay;
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
		2、同步验证
			函数: verifyResponse
				 const verifyResponse = require('node-alipay').verifyResponse;
			参数: 
			let obj = {
				publicKey: 'xxxxxxxxxxxxxxxxxxxxxxx', // 阿里的公钥: 必填
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
			verifyResponse(obj,callback)
```
****************************************************************************************
有问题欢迎交流哈~
