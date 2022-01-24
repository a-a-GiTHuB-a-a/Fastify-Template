const Fastify = require("fastify");

const fastify = Fastify({
	logger: true
});

require("./plugins")({fastify});

require("./hooks")({fastify});

require("./routes")({fastify});

fastify.listen(8080, "0.0.0.0", (err) => {
	if (err) {
		fastify.log.fatal(err, "startup error");
	}
});