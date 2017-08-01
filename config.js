const config = {
	dev: {
		url: 'https://openapi.alipaydev.com/gateway.do?'
	},
	product: {
		url: 'https://openapi.alipay.com/gateway.do?'
	},
	param: { // 必填参数(只测试必填,不测试多填参数,可能造成验签不通过,使用者注意)
		//公共参数
		'publicParam': ['app_id', 'method', 'biz_content', 'privateKey', 'publicKey'],

		//各种API
		'alipay.trade.pay': ['out_trade_no', 'scene', 'auth_code', 'subject'],
		'alipay.trade.fastpay.refund.query': ['out_request_no', ['trade_no', 'out_trade_no']],
		'alipay.trade.order.settle': ['out_request_no', 'trade_no', 'royalty_parameters'],
		'alipay.trade.close': ['operator_id', 'trade_no', 'out_trade_no'],
		'alipay.trade.cancel': [
			['out_trade_no', 'trade_no']
		],
		'alipay.trade.refund': ['refund_amount', ['out_trade_no', 'trade_no']],
		'alipay.trade.precreate': ['out_trade_no', 'total_amount', 'subject'],
		'alipay.trade.create': ['out_trade_no', 'total_amount', 'subject', 'goods_detail', ['buyer_id', 'buyer_logon_id']],
		'alipay.trade.query': [
			['out_trade_no', 'trade_no']
		],

		//手机网站支付
		'alipay.trade.wap.pay': ['out_trade_no', 'total_amount', 'subject', 'product_code']
	}
};

exports.config = config;