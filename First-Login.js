const JSsha3=require("js-sha3");
const sha3_256=JSsha3.sha3_256;
const walletPassword=document.getElementById("walletPassword");
const loginButton=document.getElementById("loginButton");
const status="b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12bfcbcf165908dd18a9e49f7ff27810176db8e9f63b4352213741664245224f8aa";

      loginButton.addEventListener("click",function(){logIn(walletPassword.value)});

        function logIn(password){
            let passwordHash=sha3_256(password);
            const authPad=localStorage.getItem("walletAuthStatus");
                if(authPad.slice(0,64)==passwordHash){
                        localStorage.setItem("walletAuthStatus",passwordHash+sha3_256(passwordHash+status.slice(0,64)));
                        window.location.href="New-Wallet.html";
                }else{
                        localStorage.setItem("walletAuthStatus",passwordHash+sha3_256(passwordHash+status.slice(64)));
                        window.alert("Password invalid!");
                }
            }