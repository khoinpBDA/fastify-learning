const { QueryTypes } = require("sequelize");
const logger = require("../common/logger");
const dbConn = require("../db/db");

class NftRepository {
  async findAll() {
    const nftList = await dbConn.user.findAll();

    return nftList;
  }

  async findById(id){
    const nft = await dbConn.nft.findByPk(id)
    return nft
  }

  async save(nft) {
    try {
      const nftSaved = await dbConn.nft.create(nft);
      console.log("Nft created successfully!");
      return nftSaved;
    } catch (e) {
      console.error(e);
      return [];
    }
  }



  async findOneByOwnerAndNftTypeAndRarityAndStatus(owner, nft_type, rarity, status) {
    const nftList = await dbConn.nft.findOne({
        where:{
            owner,
            nft_type,
            rarity,
            status,
            is_deleted: false
        }
    }
    );

    return nftList;
  }

  async update(id, updates){
    await dbConn.nft.update(updates, {
        where: {
          id
        }
      });
  }
}
module.exports = new NftRepository();
