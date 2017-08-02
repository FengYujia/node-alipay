const config = {
	dev: {
		url: 'https://openapi.alipaydev.com/gateway.do?'
	},
	product: {
		url: 'https://openapi.alipay.com/gateway.do?'
	},
	api_list: { // 必填参数(只测试必填,不测试多填参数,可能造成验签不通过,使用者注意)
		//公共参数
		'publicParam': ['app_id', 'method', 'biz_content', 'privateKey'],

		//各种API
		'alipay.trade.precreate': ['out_trade_no', 'total_amount', 'subject'],
		'alipay.trade.create': ['out_trade_no', 'total_amount', 'subject', 'goods_detail', ['buyer_id', 'buyer_logon_id']],
		'alipay.trade.pay': ['out_trade_no', 'scene', 'auth_code', 'subject'],
		'alipay.trade.cancel': [
			['out_trade_no', 'trade_no']
		],
		'alipay.trade.order.settle': ['out_request_no', 'trade_no', 'royalty_parameters'],

		//交易辅助接口
		'alipay.trade.close': ['operator_id', 'trade_no', 'out_trade_no'],
		'alipay.trade.refund': ['refund_amount', ['out_trade_no', 'trade_no']],
		'alipay.trade.query': [
			['out_trade_no', 'trade_no']
		],
		'alipay.trade.fastpay.refund.query': ['out_request_no', ['trade_no', 'out_trade_no']],

		//手机网站支付
		'alipay.trade.wap.pay': ['out_trade_no', 'total_amount', 'subject', 'product_code'],
		'alipay.trade.page.pay': ['out_trade_no', 'total_amount', 'subject', 'product_code']
	},
	product_code: {
		'alipay.trade.wap.pay': 'QUICK_WAP_WAY',
		'alipay.trade.page.pay': 'FAST_INSTANT_TRADE_PAY',
	}
};

exports.config = config;