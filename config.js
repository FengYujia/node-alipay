const config = {
	dev: {
		url: 'https://openapi.alipaydev.com/gateway.do?'
	},
	product: {
		url: 'https://openapi.alipay.com/gateway.do?'
	},
	param: {
		'publicParam': ['app_id', 'method', 'biz_content', 'rsaKey']
	}
};

exports.config = config;