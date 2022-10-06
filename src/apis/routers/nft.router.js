const nftController = require("../controllers/nft.controller");
module.exports = async function (fastify, opts) {
  fastify.post("/transfer-cards", async (req, res) => {
    console.log("Calling api transfer....");
    const resp = await nftController.transferNft(req.headers.wallet_address, req.body);
    res.status(200).send(resp)
  });
};
