const NftStatusEnum = {
    INIT:0,
    ACTIVE:1,// nft type is 1(NFT)
    SOLD:2, // nft type is 2(BOX)
    OPENING:3,// nft type is 2(BOX)
    PROCESSING_TRANSFER:4,
    PROCESSING_DEPOSIT:6,
    PROCESSING_CRAFT:7,
    PROCESSING_UPGRADE:8,
    PROCESSING_EVOLVE:9,
    IN_GAME:10,
    BURNED:11
};

module.exports = NftStatusEnum;
