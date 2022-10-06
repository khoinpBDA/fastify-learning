const logger = require('../../common/logger');
const nftRepository = require("../../repositories/nft.repository");
const NftTypeEnum = require('../../common/NftTypeEnum')
const NftStatusEnum = require('../../common/NftStatusEnum')
const WALLET_ADDRESS_TRANSFER_MINT_FROM = '0x0000000000000000000000000000000000000000'

const handle = async (event) => {
    logger.info('handling msg ' + JSON.stringify(event))
    event = event[0]

    if (event.address.toLowerCase() === process.env.ADDRESS_CONTRACT_TRANSFER_CARD.toLowerCase()) {
        logger.info('Handling event transfer card')

        //mint card
        if (event.from.toLowerCase() === WALLET_ADDRESS_TRANSFER_MINT_FROM.toLowerCase() 
        || event.from.toLowerCase() === process.env.ADDRESS_CONTRACT_VAULT_ERC_1155.toLowerCase()) {
            logger.info('Handling event mint card')
        } else {
            logger.info('Handling event transfer card between wallets')
            // transfer between wallets
            //find nft record by event
            const nftFrom = await nftRepository.findOneByOwnerAndNftTypeAndRarityAndStatus(event.from.toLowerCase(), NftTypeEnum.CARD, event.id, NftStatusEnum.ACTIVE)
            if (!nftFrom) {
                throw new Error('Nft from not found')
            }
            if (nftFrom.number_of_copies < event.value) {
                throw new Error('Number of copies not enough to transfer')
            }
            await nftRepository.update(nftFrom.id,
                {
                    txn_hash: event.txnHash,
                    number_of_copies: nftFrom.number_of_copies - event.value
                }
            )
            logger.info(`nft id = ${nftFrom.id} updated number of copies` )
        }

        //find nftTo
        const nftTo = await nftRepository.findOneByOwnerAndNftTypeAndRarityAndStatus(event.to.toLowerCase(), NftTypeEnum.CARD, event.id, NftStatusEnum.ACTIVE)
            if (!nftTo) {
                //init
                await nftRepository.save({
                    name: 'card name',
                    status: NftStatusEnum.ACTIVE,
                    nft_type: NftTypeEnum.CARD,
                    bc_id: event.id,
                    owner: event.to.toLowerCase(),
                    rarity: event.id,
                    txn_hash: event.txnHash,
                    number_of_copies: event.value
                })
                logger.info('New nft saved')
            } else{
                //update number of copies
                await nftRepository.update(nftTo.id,
                    {
                        txn_hash: event.txnHash,
                        number_of_copies: nftFrom.number_of_copies + event.value
                    }
                )
                logger.info(`nft id = ${nftTo.id} updated number of copies` )
            }
    }
}

module.exports = { handle }