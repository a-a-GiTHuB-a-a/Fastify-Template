module.exports = function routes({fastify}) {
	fastify.get("/", async (req, res) => {
		return res.render("index", {
			title: "Sample Fastify Page",
		});
	});
	fastify.get("/error", async (req, res) => {
		throw new Error("test");
	});

	fastify.setNotFoundHandler(async (req, res) => {
		return res.status(404).render("404", {
			title: "Sample Fastify 404 Page",
		});
	});

	fastify.setErrorHandler(async (err, req, res) => {
		req.log.error({err}, "error detected");
		return res.status(500).render("500", {
			title: "Sample Fastify 500 Page",
			error: err
		});
	});
};