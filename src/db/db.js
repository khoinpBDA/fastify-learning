const { Sequelize, Model, DataTypes } = require("sequelize");
const logger = require("../common/logger");
require("dotenv").config();

const connect = () => {
  const dbUri = process.env.DB_URL.replace("jdbc:postgresql:", "postgres:");
  const sequelize = new Sequelize(dbUri, {
    dialect: "postgres",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    pool: {
      min: +process.env.DB_POOL_MIN || 0,
      max: +process.env.DB_POOL_MAX || 10,
      acquire: +process.env.DB_POOL_ACQUIRE || 20000,
      idle: +process.env.DB_POOL_IDLE || 5000,
    },
    logging: (msg) => {
      if (process.env.DB_SHOW_SQL === "true") {
        logger.info(`Sql: ${msg}`);
      }
    },
  });

  const db = {};
  db.sequelize = sequelize;
  db.user = require("../models/User.model")(
    sequelize,
    DataTypes,
    Model
  );

  db.nft = require("../models/Nft.model")(
    sequelize,
    DataTypes,
    Model
  );

  return db;
};

const dbConn = connect();

module.exports = dbConn;
