const IPFS=require("ipfs");
//const IPFS=require("ipfs-http-client");
const crypto=require("crypto");
const Web3=require("web3");
const web3=new Web3(new Web3.providers.WebsocketProvider("wss://ropsten.infura.io/ws/v3/57574a72c7bb464dbf287dfadeb940ae"));
const passwordHash=crypto.createHash("md5","258963");
      passwordHash.update("mahmoudabad1395");
const ivHash=crypto.createHash("md5","258963");
      ivHash.update("258963");
    async function register()  {
        const encryptedAccount=web3.eth.accounts.encrypt("0x4b62adb3de348452e2644327be39d9f82ce3a7562eb3b628bb306cec3e678454", "258963");
        const ipfsPass=passwordHash.digest("hex");
        const ivPad=ivHash.digest("hex");
        const cipherKey=crypto.createCipheriv("aes-256-ctr",ipfsPass,ivPad.slice(0,16));
        let cipherText=cipherKey.update(JSON.stringify(encryptedAccount),"utf8","hex");
            cipherText+=cipherKey.final("hex");
        const peer=await IPFS.create({url:"https://dweb.link"});
              peer.add(cipherText).then(function(data){
                console.log(data.path);
            });
        
    }
    async function recover(){
        const peer= await IPFS.create({host:"127.0.0.1",port:4003,protocol:"HTTP","api-path":"/ipfs/api/v0"});
        const flow= peer.cat("QmcpHLXf25pk29SVKg1vNvbUDDjwRusx6rvWnjDnyS8LWP");
                let cipherText="";
            for await(const chunk of flow){
                cipherText+=chunk.toString();
            }
            const ipfsPass=passwordHash.digest("hex");
            const ivPad=ivHash.digest("hex");
            const aesKey=crypto.createDecipheriv("aes-256-ctr",ipfsPass,ivPad.slice(0,16));
            let plainText=aesKey.update(cipherText,"hex","utf8");
                plainText+=aesKey.final("utf8");
                console.log(plainText); 
    }
    recover();