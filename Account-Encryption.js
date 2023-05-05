const Web3=require("web3");
const IPFS=require("ipfs");
const crypto=require("crypto");
const web3=new Web3( new Web3.providers.HttpProvider("https://127.0.0.1:8545"));
const myAccount=web3.eth.accounts.encrypt("0x39e47f55cb0e5f81fabb2c664b604c04e8c73e2b62f02500636fd69ba923e4f1", "258963");
      async function ipfsStore(){
        let entropy=Buffer.alloc(16);
        const cipherKey=crypto.createCipheriv("aes-256-ctr", "25896325896325896325896325896300",entropy);
        let cipherText=cipherKey.update(JSON.stringify(myAccount),"utf8","hex");
            cipherText+=cipherKey.final("hex");
          const peer=await IPFS.create();
                peer.add(cipherText).then(function(data){console.log(data); console.log(entropy)});
      }
      async function ipfsGet(){
          const peer=await IPFS.create();
          const sequence=peer.cat("QmbCqwyeq4gqXKEHH16jcZShHkcN6Y8cSbgUhgERHpDab6");
          let mainContent="";
                for await(const chunk of sequence){
                    mainContent+=chunk.toString();
                }
          const decipherKey=crypto.createDecipheriv("aes-256-ctr","25896325896325896325896325896300",Buffer.from([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]));
          let plainText=decipherKey.update(mainContent,"hex","utf8");
              plainText+=decipherKey.final("utf8");
                console.log(plainText);
      }
      ipfsStore();
      
      