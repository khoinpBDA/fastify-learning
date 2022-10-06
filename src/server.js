const { build } = require("./app.js");
const logger = require("./common/logger");

const start = async () => {
  const app = await build({ logger: false });

  const port = process.env.PORT || 3002;
  app.listen({ port: port, host: "127.0.0.1" }, (err, address) => {
    logger.info(`Server listening at ${address}`);
    if (err) {
      logger.error(err);
      process.exit(1);
    }
  });
};

start();
