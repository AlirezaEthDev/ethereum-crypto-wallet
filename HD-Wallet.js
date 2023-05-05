const Web3=require("web3");
const web3=new Web3(new Web3.providers.WebsocketProvider("wss://ropsten.infura.io/ws/v3/57574a72c7bb464dbf287dfadeb940ae"));
const {generateMnemonic,EthHdWallet}=require("eth-hd-wallet");
const mnemonic="crazy weasel ostrich also shallow film ordinary critic bottom say night devote";
const myHDWallet=EthHdWallet.fromMnemonic(mnemonic);
const Addresses=myHDWallet.generateAddresses(6);
const transaction={
      from:Addresses[5],
      to:web3.utils.toChecksumAddress("0x846365Ed63b358C2309AE254324a7BeB4cE77eA6"),
      value:2000000000000000,
      nonce:1,
      gasLimit:21000
}
      web3.eth.getGasPrice().then(function(data){transaction.gasPrice=data});
const signedTransaction=myHDWallet.signTransaction(transaction);
      web3.eth.sendSignedTransaction(signedTransaction).on("receipt",console.log);