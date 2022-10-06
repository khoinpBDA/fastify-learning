const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes, Model) => {
  class Nft extends Model {}
  Nft.init(
    {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      name: {
        type: Sequelize.STRING(255),
      },
      status: {
        type: Sequelize.INTEGER,
      },
      nft_type: {
        type: Sequelize.INTEGER,
      },
      nft_item_hash: {
        type: Sequelize.STRING(255),
      },
      bc_id: {
        type: Sequelize.INTEGER,
      },
      owner: {
        type: Sequelize.STRING(255),
      },
      description: {
        type: Sequelize.STRING(255),
      },
      market_status: {
        type: Sequelize.INTEGER,
      },
      rarity: {
        type: Sequelize.INTEGER,
      },
      url_2d: {
        type: Sequelize.STRING(255),
      },
      user_id: {
        type: Sequelize.STRING(255),
      },
      txn_hash: {
        type: Sequelize.STRING(255),
      },
      number_of_copies: {
        type: Sequelize.INTEGER,
      },
      metadata_cid: {
        type: Sequelize.STRING(255),
      },
    },
    {
      sequelize,
      modelName: "nft",
      timestamps: false,
    }
  );
  return Nft;
};
