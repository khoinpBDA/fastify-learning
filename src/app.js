const fastify = require("fastify");

// database
const { Liquibase } = require("liquibase");
const { fastifyRequestContextPlugin } = require("@fastify/request-context");
// const fastifyHealthcheckPlugin = require('fastify-healthcheck');

// routes
const userRouter = require("./apis/routers/user.router");
const nftRouter = require('./apis/routers/nft.router')

const logger = require("./common/logger");
const stringUtil = require("./utils/stringUtil");
const generateResponse = require("./utils/generateResponse");
const EnumCodeError = require("./common/EnumCodeError");

const build = async (opts = {}) => {
  /**
   * DB migration
   */
  const myConfig = {
    ...Liquibase.POSTGRESQL_DEFAULT_CONFIG,
    changeLogFile: "resources/liquibase/db.changelog.xml",
    url: process.env.DB_URL,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logLevel: "warnings",
  };
  const instTs = new Liquibase(myConfig);

  await instTs
    .update()
    .then(() => logger.info("--- Database migration: success"))
    .catch((err) => {
      logger.error("--- Database migration: fail", err);
      process.exit(1);
    });



  
  const kafkaConsumer = require('./kafka/consumer')
  kafkaConsumer.consume()

  /**
   * App initialization
   */
  const app = fastify(opts);

  app.register(fastifyRequestContextPlugin);
  // app.register(fastifyHealthcheckPlugin);

  app.addHook("preValidation", (req, reply, done) => {
    // Overwrite the defaults.
    // This is completely equivalent to using app.requestContext or just requestContext
    const refId = req.headers["lp-ref-id"];
    req.requestContext.set(
      "traceid",
      stringUtil.randomString() + (refId ? "." + refId : "")
    );
    req.requestContext.set("refid", refId);

    logger.info("Received request", {
      url: req.raw.url,
      method: req.method,
      body: req.body,
    });
    done();
  });

  app.addHook("onSend", (req, reply, payload, done) => {
    // for logging in response
    reply.header("LP-TRACE-ID", req.requestContext.get("traceid"));
    reply.responseData = payload;
    done(null, payload);
  });

  app.addHook("onResponse", (req, reply, done) => {
    logger.info("Request completed", {
      url: req.raw.url, // add url to response as well for simple correlating
      statusCode: reply.raw.statusCode,
      durationMs: reply.getResponseTime(), // recreate duration in ms - use process.hrtime() - https://nodejs.org/api/process.html#process_process_hrtime_bigint for most accuracy
      responseData: JSON.parse(reply.responseData),
    });
    done();
  });

  app.setErrorHandler(function (error, request, reply) {
    // Log error
    logger.error("setErrorHandler: " + error);
    // Send error response
    reply
      .status(error.statusCode || 500)
      .send(
        generateResponse(
          error.code || EnumCodeError.SYSTEM_ERROR,
          error.message
        )
      );
  });

  /**
   * Catch errors during coding
   * Ex: A is not defined
   */
  // app.addHook("onError", (request, reply, error, done) => {
  //     logger.error("Message", error);
  //     reply.send(generateResponse.error(error.message));
  //     done();
  // });

  /**
   * ROUTE
   */
  app.register(userRouter, { prefix: "/my-app" });
  app.register(nftRouter, {prefix:'/nfts'})

  return app;
};

module.exports = { build };
