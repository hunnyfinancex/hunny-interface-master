const Web3 = require('web3');
const LuckyDraw = require('../../contracts/build/contracts/LuckyDraw.json');

const PROVIDER = 'https://data-seed-prebsc-1-s1.binance.org:8545';
const MAINTAINER =
  '1e76c1a5205e3fdd85d436d65a5425bcf63be02dae99706c2deb26e287208d9f';

const CONTRACT = '0x64af4A4312d5275e747eBc12E1Ea244f16283E2d';

const web3 = new Web3(PROVIDER);
const contract = new web3.eth.Contract(LuckyDraw.abi, CONTRACT);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  let callData = contract.methods
    .reset(
      Math.floor(new Date().getTime() / 1000) + 300,
      web3.utils.toWei('0.01', 'ether')
    )
    .encodeABI();

  let txData = {
    gas: 2000000,
    gasPrice: 50000000000,
    to: CONTRACT,
    from: web3.eth.accounts.privateKeyToAccount(MAINTAINER).address,
    value: 0,
    data: callData,
  };

  let signedTx = await web3.eth.accounts.signTransaction(txData, MAINTAINER);
  let tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  console.log(`Transaction: ${tx.transactionHash}`);
})();
