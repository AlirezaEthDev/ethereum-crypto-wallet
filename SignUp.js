const JSsha3=require("js-sha3");
const sha3_256=JSsha3.sha3_256;
const status="b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12bfcbcf165908dd18a9e49f7ff27810176db8e9f63b4352213741664245224f8aa";

const walletPassword=document.getElementById("walletPassword");
const walletPasswordConfirm=document.getElementById("walletPasswordConfirm");
const signupButton=document.getElementById("signupButton");

      signupButton.addEventListener("click",function(){
          if(walletPassword.value==walletPasswordConfirm.value){
              passwordRegister(walletPassword.value);
          }else{
              window.alert("Two entered passwords don't match together!");
          }
      });

      function passwordRegister(password){
        let passwordHash=sha3_256(password);
            localStorage.setItem("walletAuthStatus",passwordHash+sha3_256(passwordHash+status.slice(64)));//status.slice(0,64) is true status.
            window.location.href="First-Login.html";       
    }