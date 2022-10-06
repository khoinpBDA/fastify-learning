const Web3 = require('web3');
const cardAbi = require('../../../resources/abi/cardAbi');
// const address = process.env.OPERATOR_PUBLIC_KEY
// const privateKey = process.env.OPERATOR_PRIVATE_KEY
const bscUrl = process.env.RPC_URL

//Hard way (web3#signTransaction() + web3#sendSignedTransaction())
const transfer = async (from, to, rarity, amount, userPrivatekey) => {
  const web3 = new Web3(bscUrl)
  const networkId = process.env.NETWORK_ID
  const myContract = new web3.eth.Contract(
    cardAbi,
    process.env.ADDRESS_CONTRACT_TRANSFER_CARD
  );

  const tx = myContract.methods.safeTransferFrom(from, to, rarity+'', amount+'', '0x0')

  const gas = await tx.estimateGas({from: from});
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(from);

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: myContract.options.address, 
      data,
      gas,
      gasPrice,
      nonce, 
      chainId: networkId
    },
    userPrivatekey
  );
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
}

module.exports = {transfer}

