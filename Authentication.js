const { Console } = require("console");
const crypto=require("crypto");
const fs=require("fs");
const hidefile=require("hidefile");
let walletHash=crypto.createHash("sha3-256","walletHash");

    logIn("havadelpazirshod");
    function passwordRegister(password){
        let passwordHash=crypto.createHash("sha3-256",password);
            passwordHash.update(password);
            passwordHash=passwordHash.digest("hex");
            fs.readFile("E:/Crypto-Wallet-Demo/StatusFile.txt",function(err,status){
                if(err) throw err;
                else{
                    walletHash.update(passwordHash+status.slice(0,64));//status.slice(0,64) is true status.
                    walletHash=walletHash.digest("hex");
                    fs.writeFile("E:/SecretData.txt",passwordHash+walletHash,function(err){
                        if(err) throw err;
                        else{
                            hidefile.hide("E:/SecretData.txt",function(err,newPath){
                                if(err) throw err;
                                else console.log(newPath);
                            });
                        }
                    });
                }
            });       
    }
    function logIn(password){
        let passwordHash=crypto.createHash("sha3-256",password);
            passwordHash.update(password);
            passwordHash=passwordHash.digest("hex");
            fs.readFile("E:/Crypto-Wallet-Demo/StatusFile.txt",function(err,statusPad){
                if(err) throw err;
                else{
                    hidefile.reveal("E:/.SecretData.txt",function(err){
                        if(err){
                            hidefile.hide("E:/SecretData.txt",function(error){
                                if(error) throw error;
                            });
                            throw err;
                        }
                        else{
                            fs.readFile("E:/SecretData.txt",function(err,data){
                                if(err) throw err;
                                else{
                                    if(data.slice(0,64)==passwordHash){
                                        walletHash.update(passwordHash+statusPad.slice(0,64));
                                        walletHash=walletHash.digest("hex");
                                        fs.writeFile("E:/SecretData.txt",passwordHash+walletHash,function(err){
                                            if(err) throw err;
                                            else{
                                                hidefile.hide("E:/SecretData.txt",function(err,newPath){
                                                    if(err) throw err;
                                                });
                                            }
                                        });
                                    }else{
                                        walletHash.update(data.slice(0,64)+statusPad.slice(64));
                                        walletHash=walletHash.digest("hex");
                                        fs.writeFile("E:/SecretData.txt",data.slice(0,64)+walletHash,function(err){
                                            if(err) throw err;
                                            else{
                                                hidefile.hide("E:/SecretData.txt",function(err,newPath){
                                                    if(err) throw err;
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            });

    }
    function logOut(){
        if(confirm("Are you sure about the exit?")){
            const status="b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12bfcbcf165908dd18a9e49f7ff27810176db8e9f63b4352213741664245224f8aa";
            const authPad=localStorage.getItem("walletAuthStatus");
            const passwordHash=authPad.slice(0,64);
                localStorage.setItem("walletAuthStatus",passwordHash+sha3_256(passwordHash+status.slice(64)));
                window.location.href="Login.html";
        }
    }
    function passwordReset(oldPassword,newPassword){
        const status="b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12bfcbcf165908dd18a9e49f7ff27810176db8e9f63b4352213741664245224f8aa";
        const authPad=localStorage.getItem("walletAuthStatus");
        const passwordHash=authPad.slice(0,64);
              if(sha3_256(oldPassword)==passwordHash){
                    localStorage.setItem("walletAuthStatus",sha3_256(newPassword)+sha3_256(sha3_256(newPassword)+status.slice(0,64)));
                    window.alert("New password was reset successfully!");
                    window.location.href="New-Wallet.html";
              }else{
                  window.alert("Old password is invalid!");
              }
    }