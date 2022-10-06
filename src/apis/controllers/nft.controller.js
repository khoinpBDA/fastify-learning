const nftService = require("../../services/nft.service");

module.exports = {
  transferNft: async (walletAddress, transferBodyRequest) => {
    try {
      const response = await nftService.doTransfer(walletAddress, transferBodyRequest)
      return response
    } catch (e) {
      throw new Error(e);
    }
  }
};
