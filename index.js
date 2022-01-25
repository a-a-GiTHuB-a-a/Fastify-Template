const Fastify = require("fastify");

const fastify = Fastify({
	logger: true
});

require("./plugins")({fastify});

require("./hooks")({fastify});

require("./routes")({fastify});

fastify.listen({
	port: 8080,
	host: "0.0.0.0",
	backlog: 255
}, (err) => {
	if (err) {
		fastify.log.fatal(err, "startup error");
	}
});