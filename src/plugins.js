module.exports = function plugins({fastify}) {
	fastify.register(require("fastify-helmet"), {
		global: true,
		contentSecurityPolicy: {
			directives: {
				"script-src": [
					"'self'",
					"code.jquery.com"
				],
				"frame-ancestors": [
					"'self'"
				]
			}
		},
		frameguard: false
	});
	fastify.register(require("fastify-compress"), {
		global: true
	});
	fastify.register(require("fastify-static"), {
		root: `${__dirname}/../public`,
		prefix: "/static/"
	});
	fastify.register(require("point-of-view"), {
		engine: {
			ejs: require("ejs")
		},
		includeViewExtension: true,
		root: `${__dirname}/../views`,
		layout: "./layouts/main",
		propertyName: "render"
	});
};