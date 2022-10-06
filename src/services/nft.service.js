const nftRepository = require("../repositories/nft.repository");
const Nft = require("../models/Nft.model");
const web3Service = require('../services/web3/web3.service')

module.exports = {
  doTransfer: async(walletAddress, req) =>{
    //validate
    if(!walletAddress){
      throw new Error('WalletAddress not found')
    }
    const findNft = await nftRepository.findById(req.id)
    if(!findNft){
      throw new Error('Nft not found')
    }
    
    if(walletAddress.toLowerCase() !== findNft.owner.toLowerCase()){
      throw new Error('Bad request')
    }

    await web3Service.transfer(walletAddress, req.toAddress, findNft.rarity, req.amount, req.userPrivateKey)
    //call bc
    // create processing
  }
};
