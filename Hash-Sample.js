
const crypto=require("crypto");
const passwordHash=crypto.createHash("md5","258963");
      passwordHash.update("mahmoudabad1395");
const ivHash=crypto.createHash("md5","258963");
      ivHash.update("258963");
      function encryption(){
          const ipfsPass=passwordHash.digest("hex");
          const ivPad=ivHash.digest("hex");
          const aesKey=crypto.createCipheriv("aes-256-ctr",ipfsPass,ivPad.slice(0,16));
          let aesText=aesKey.update("EthChange","utf8","hex");
              aesText+=aesKey.final("hex");
              return aesText;
      }
      function decryption(){
        const MD5=md5Hash.digest("hex");
          const aesKey=crypto.createDecipheriv("aes-256-ctr",MD5,MD5.slice(0,16));
          let plainText=aesKey.update("46f84946c3c2bdff75","hex","utf8");
              plainText+=aesKey.final("utf8");
              return plainText;
      }
      console.log(encryption());
      /*function hex2a(hex) 
        {
            var str = '';
            for (var i = 0; i < hex.length; i += 2)
                str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
            return str;
        } 
      function ascii_to_hex(str)
        {
            var arr1 = [];
            for (var n = 0, l = str.length; n < l; n ++) 
            {
                var hex = Number(str.charCodeAt(n)).toString(16);
                arr1.push(hex);
            }
            return arr1.join('');
        }*/
       