const JSsha3=require("js-sha3");
const sha3_256=JSsha3.sha3_256;
const oldPassword=document.getElementById("oldPassword");
const newPassword=document.getElementById("newPassword");
const newPasswordConfirm=document.getElementById("newPasswordConfirm");
const setButton=document.getElementById("setButton");
const status="b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12bfcbcf165908dd18a9e49f7ff27810176db8e9f63b4352213741664245224f8aa";

      setButton.addEventListener("click",function(){
          if(oldPassword.value!=""&&newPassword.value!=""&&newPasswordConfirm.value!=""){
          if(newPassword.value!=oldPassword.value){
                if(newPassword.value==newPasswordConfirm.value){
                passwordReset(oldPassword.value,newPassword.value);
                }else{
                    window.alert("New password is not match with the new password confirm!");
                }
        }else{
            window.alert("New password shouldn't be equal to the old password!");
        }
    }else{
        window.alert("Please don't let any field empty!");
    }
        });

function passwordReset(old_Password,new_Password){
    const authPad=localStorage.getItem("walletAuthStatus");
    const passwordHash=authPad.slice(0,64);
          if(sha3_256(old_Password)==passwordHash){
                localStorage.setItem("walletAuthStatus",sha3_256(new_Password)+sha3_256(sha3_256(new_Password)+status.slice(0,64)));
                window.alert("New password was reset successfully!");
                window.location.href="New-Wallet.html";
          }else{
              window.alert("Old password is invalid!");
          }
}