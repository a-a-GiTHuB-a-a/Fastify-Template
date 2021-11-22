const Fastify = require("fastify");
const pointOfView = require("point-of-view");
const ejs = require("ejs");
const staticServe = require("fastify-static");
const compress = require("fastify-compress");

const fastify = Fastify({
	logger: {
		serializers: {
			req(req) {
				return {
					method: req.method,
					url: req.url
				};
			},
			res(res) {
				return {
					status: res.statusCode
				};
			},
			err(err) {
				return {
					name: err.name,
					message: err.message
				};
			}
		}
	},
	disableRequestLogging: true
});

fastify.register(compress, {
	global: true
});
fastify.register(staticServe, {
	root: `${__dirname}/public`,
	prefix: "/static/"
});
fastify.register(pointOfView, {
	engine: {
		ejs
	}
});
fastify.after(() => {
	fastify.decorateReply("render", function(path, locals = {}) {
		return this.view(`views/${path}.ejs`, locals);
	});
});

fastify.addHook("preHandler", async (req, res) => {
	res.removeHeader("x-powered-by");
});
fastify.addHook("onRequest", async (req, res) => {
	req.log.info({req}, "request detected");
});
fastify.addHook("onResponse", async (req, res) => {
	req.log.info({req, res}, "response sent");
});

fastify.get("/", async (req, res) => {
	res.render("pages/index");
});
fastify.get("/error", async (req, res) => {
	throw new Error("oof");
});

fastify.setNotFoundHandler((req, res) => {
	res.status(404).render("pages/404", {url: req.url});
});

fastify.setErrorHandler((err, req, res) => {
	req.log.error({err}, "error detected");
	res.status(500).render("pages/500", {error: err});
});

fastify.listen(8080, "0.0.0.0");