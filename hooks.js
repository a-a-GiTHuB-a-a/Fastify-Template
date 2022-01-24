module.exports = function hooks({fastify}) {
	fastify.addHook("preHandler", async (req, res) => {
		res.locals = {
			url: req.url
		};
		if (req.url.match(/^\/static\//)) {
			res.header("cache-control", "public; max-age=604800");
		} else {
			res.header("cache-control", "no-store");
		}
	});
	fastify.addHook("onError", async (req, res, err) => {
		req.log.info({req, err}, "server error");
	});
};