const JSsha3=require("js-sha3");
const sha3_256=JSsha3.sha3_256;
const authPad=localStorage.getItem("walletAuthStatus");
const passwordHash=authPad.slice(0,64);
const statusPad=authPad.slice(64);
const status="b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12bfcbcf165908dd18a9e49f7ff27810176db8e9f63b4352213741664245224f8aa";
      if(sha3_256(passwordHash+status.slice(0,64))==statusPad){        
const Web3=require("web3");
const fileSaver=require("file-saver");
const IPFS=require("ipfs");
const crypto=require("crypto");
const web3=new Web3(new Web3.providers.WebsocketProvider("wss://ropsten.infura.io/ws/v3/57574a72c7bb464dbf287dfadeb940ae"));
const createAccount=document.getElementById("createAccount");
const addAccount=document.getElementById("addAccount");
const deleteAccount=document.getElementById("deleteAccount");
const sendTransaction=document.getElementById("sendTransaction");
const viewAccounts=document.getElementById("viewAccounts");
const viewNetwork=document.getElementById("viewNetwork");
const history=document.getElementById("history");
const clearWallet=document.getElementById("clearWallet");
const removeWallet=document.getElementById("removeWallet");
const passwordReset=document.getElementById("passwordReset");
const logOut=document.getElementById("logOut");
const availableNetworks=document.getElementById("availableNetworks");
const sentTransactions=document.getElementById("sentTransactions");
const pendingTransactions=document.getElementById("pendingTransactions");
const viewNetworkItem=document.getElementsByClassName("viewNetworkItem");
const etherscan=document.getElementById("etherscan");
const exportFile=document.getElementById("exportFile");
const saveToIPFS=document.getElementById("saveToIPFS");
const detailsData=document.getElementsByClassName("detailsData");
const  Index=localStorage.getItem("Index");
const mainWallet=web3.eth.accounts.wallet;
      mainWallet.load(statusPad);
const connectedNetwork=document.getElementById("connectedNetwork");
const walletAccount=document.getElementById("walletAccount");
const walletAccountsList=document.getElementById("walletAccountsList");
const networkComponents=document.getElementsByClassName("horizontalItem");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Setting the horizontal bar values:
      
//Map to set network based on provider and vice versa:
const providerToNetwork=new Map();
        providerToNetwork.set("wss://mainnet.infura.io/ws/v3/57574a72c7bb464dbf287dfadeb940ae", "Ethereum Mainnet");
        providerToNetwork.set("wss://ropsten.infura.io/ws/v3/57574a72c7bb464dbf287dfadeb940ae", "Ropsten (Test Network)");
        providerToNetwork.set("wss://kovan.infura.io/ws/v3/57574a72c7bb464dbf287dfadeb940ae", "Kovan (Test Network)");
        providerToNetwork.set("wss://rinkeby.infura.io/ws/v3/57574a72c7bb464dbf287dfadeb940ae", "Rinkeby (Test Network)");
        providerToNetwork.set("wss://goerli.infura.io/ws/v3/57574a72c7bb464dbf287dfadeb940ae", "Goerli (Test Network)");
const networkToProvider=new Map();
        networkToProvider.set("Ethereum Mainnet","wss://mainnet.infura.io/ws/v3/57574a72c7bb464dbf287dfadeb940ae");
        networkToProvider.set("Ropsten (Test Network)","wss://ropsten.infura.io/ws/v3/57574a72c7bb464dbf287dfadeb940ae");
        networkToProvider.set("Kovan (Test Network)","wss://kovan.infura.io/ws/v3/57574a72c7bb464dbf287dfadeb940ae");
        networkToProvider.set("Rinkeby (Test Network)","wss://rinkeby.infura.io/ws/v3/57574a72c7bb464dbf287dfadeb940ae");
        networkToProvider.set("Goerli (Test Network)","wss://goerli.infura.io/ws/v3/57574a72c7bb464dbf287dfadeb940ae");
//Map for Etherscan button:        
const networkToEtherscan=new Map();
        networkToEtherscan.set("Ethereum Mainnet","https://etherscan.io/address/");
        networkToEtherscan.set("Ropsten (Test Network)","https://ropsten.etherscan.io/address/")
        networkToEtherscan.set("Kovan (Test Network)","https://kovan.etherscan.io/address/");
        networkToEtherscan.set("Rinkeby (Test Network)","https://rinkeby.etherscan.io/address/");
        networkToEtherscan.set("Goerli (Test Network)","https://goerli.etherscan.io/address/");
//Set provider gateway to the horizontal bar by current provider url:            
        connectedNetwork.value=providerToNetwork.get(web3.eth.currentProvider.url);
//Set chain id on horizontal bar:            
        web3.eth.getChainId().then(function(data){networkComponents[1].innerHTML+=" "+data});
//Set provider on horizontal bar:            
        networkComponents[2].innerHTML+=" "+web3.eth.currentProvider.url;
//Setting datalist of accessable accounts:            
if(mainWallet.length>0){
        for(let i=0; i<mainWallet.length; i++){
                const listOption=document.createElement("option");
                        listOption.value="Index: "+mainWallet[i].index+" >> Address: "+mainWallet[i].address;
                        walletAccountsList.appendChild(listOption);
        }
//Setting default account and show that on horizontal bar:            
        walletAccount.value=walletAccountsList.firstChild.value.slice(21);
        web3.eth.defaultAccount=walletAccount.value;
//Setting balance and nonce of the default account:
        web3.eth.getBalance(web3.eth.defaultAccount).then(function(data){networkComponents[4].innerHTML+=" "+web3.utils.fromWei(data)+" ETH"});
        web3.eth.getTransactionCount(web3.eth.defaultAccount).then(function(data){networkComponents[5].innerHTML+=" "+data});
}else{
        walletAccount.value="There is no account!";
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Setting events:
        connectedNetwork.addEventListener("change", function(){networkShifting(connectedNetwork.value)});
        walletAccount.addEventListener("change", function(){walletAccount.value=walletAccount.value.slice(21); defaultAccountSetting(walletAccount.value);});
        createAccount.addEventListener("click", gotoCreateAccount);
        addAccount.addEventListener("click", gotoAddAccount);
        deleteAccount.addEventListener("click", gotoDeleteAccount);
        sendTransaction.addEventListener("click", gotoSendTransaction);
        viewAccounts.addEventListener("click", gotoViewAccounts);
        viewNetwork.addEventListener("click", networkSubmenuSetting);
        availableNetworks.addEventListener("click", function(){mainWallet.save(statusPad); window.location.href="Available-Networks.html"});
        sentTransactions.addEventListener("click", function(){mainWallet.save(statusPad); window.location.href="Sent-Transactions.html"});
        pendingTransactions.addEventListener("click", function(){mainWallet.save(statusPad); window.location.href="Pending-Transactions.html"});
        clearWallet.addEventListener("click", walletClearing);
        removeWallet.addEventListener("click", function(){window.alert("This option will be operatable whenever this wallet upgraded to a HD wallet!")});
        passwordReset.addEventListener("click",function(){window.location.href="Password-Reset.html"});
        logOut.addEventListener("click", walletLogout);
        etherscan.addEventListener("click", gotoEtherscan);
        exportFile.addEventListener("click", exportAccountFile);
        saveToIPFS.addEventListener("click",saveOnIPFS);
        detailsData[0].textContent=mainWallet[Index].index;
        detailsData[1].textContent=mainWallet[Index].address;
        detailsData[2].textContent=mainWallet[Index].privateKey;
        web3.eth.getBalance(mainWallet[Index].address).then(function(data){detailsData[3].textContent=web3.utils.fromWei(data)+" ETH"});
        web3.eth.getTransactionCount(mainWallet[Index].address).then(function(data){detailsData[4].textContent=data});
//Event handlers:
        function gotoCreateAccount(){
            try{
                    if(mainWallet.save(statusPad)){
                            window.location.href="Create-Account.html";
                    }else{
                            throw "The process failed and stopped!\nYou was about to lose this wallet forever!\nTry again!";
                    }
                }
                catch(error){
                        window.alert(error);
                    }
                }
        function gotoAddAccount(){
                try{
                        if(mainWallet.save(statusPad)){
                                window.location.href="Add-Account.html";
                        }else{
                                throw "The process failed and stopped!\nYou was about to lose this wallet forever!\nTry again!";
                        }
                }
                catch(error){
                        window.alert(error);
                }
        }
         function gotoDeleteAccount(){
                try{
                        if(mainWallet.save(statusPad)){
                                window.location.href="Delete-Account.html";
                        }else{
                                throw "The process failed and stopped!\nYou was about to lose this wallet forever!\nTry again!";
                        }
                }
                catch(error){
                        window.alert(error);
                }
        }
        function gotoSendTransaction(){
                try{
                        if(mainWallet.save(statusPad)){
                                window.location.href="Send-Transaction.html";
                        }else{
                                throw "The process failed and stopped!\nYou was about to lose this wallet forever!\nTry again!";
                        }
                }
                catch(error){
                        window.alert(error);
                }
        }
        function exportAccountFile(){
                        const encryptedAccount=web3.eth.accounts.encrypt(mainWallet[Index].privateKey, "258963");
                        const safeAccount=new Blob([JSON.stringify(encryptedAccount)], {type: "text/json"});
                              fileSaver.saveAs(safeAccount, "safeAccount.txt");
        }
        async function saveOnIPFS(){
                try{       
                        if(window.confirm("By this way, You can access to the saved account just by this wallet!")){
                                let ipfsPassword=window.prompt("Enter a password for encryption the account on IPFS:",);
                                    if(ipfsPassword!==null){
                                        const encryptedAccount=web3.eth.accounts.encrypt(mainWallet[Index].privateKey, "258963");
                                        const passwordHash=crypto.createHash("md5","258963");//258963 should be changed to wallet's password!
                                              passwordHash.update(ipfsPassword);
                                        const ivHash=crypto.createHash("md5","258963");
                                              ivHash.update("258963");
                                        const ipfsPass=passwordHash.digest("hex");
                                        const ivPad=ivHash.digest("hex");
                                        const cipherKey=crypto.createCipheriv("aes-256-ctr",ipfsPass,ivPad.slice(0,16));
                                        let cipherText=cipherKey.update(JSON.stringify(encryptedAccount),"utf8","hex");
                                                cipherText+=cipherKey.final("hex");
                                        const peer=await IPFS.create();
                                                peer.add(cipherText).then(function(data){
                                                        localStorage.setItem("ipfsHash",data.path);
                                                        mainWallet.save(statusPad);
                                                        window.location.href="ipfsHash-of-Saved-Account.html";
                                                });
                                }
                        }
                        
                }catch(error){
                window.alert(error);
                }
            }
        function gotoViewAccounts(){
                try{
                        if(mainWallet.save(statusPad)){
                                window.location.href="View-Accounts.html";
                        }else{
                                throw "The process failed and stopped!\nYou was about to lose this wallet forever!\nTry again!";
                        }
                }
                catch(error){
                        window.alert(error);
                }
        }
        function networkSubmenuSetting(){
                if(viewNetworkItem[0].style.display=="none"||viewNetworkItem[0].style.display==""){
                        for(let i=0; i<viewNetworkItem.length; i++){
                                viewNetworkItem[i].style.display="block";
                        }
                }else{
                        for(let i=0; i<viewNetworkItem.length; i++){
                                viewNetworkItem[i].style.display="none";
                        }
                }
        }
        function walletClearing(){
                        if(confirm("You are deleting all accounts from this wallet!\nWe suggest you take a backup from the accounts in first then delete them!")){
                                if(confirm("Did You take a backup from the accouts?\nClick 'Cancel' to prevent delete accounts!")){
                                        mainWallet.clear();
                                        window.alert("The wallet was cleared and there is no account here!");
                                }
                        }
        }
        function walletLogout(){
                if(confirm("Are you sure about the exit?")){
                        const authPad=localStorage.getItem("walletAuthStatus");
                        const passwordHash=authPad.slice(0,64);
                            localStorage.setItem("walletAuthStatus",passwordHash+sha3_256(passwordHash+status.slice(64)));
                            window.location.href="Login.html";
                    }
        }
        function gotoEtherscan(){
                const etherscanURL=networkToEtherscan.get(providerToNetwork.get(web3.eth.currentProvider.url)); 
                mainWallet.save(statusPad); 
                window.location.href=etherscanURL+mainWallet[Index].address;
        }
        function networkShifting(networkName){
                        try{
                                if(web3.setProvider(networkToProvider.get(networkName))){
                                        web3.eth.getChainId().then(function(ID){networkComponents[1].innerHTML="Chain ID: "+ID;})
                                        networkComponents[2].innerHTML="Provider: "+web3.eth.currentProvider.url;
                                        web3.eth.getBalance(web3.eth.defaultAccount).then(function(balance){networkComponents[4].innerHTML="Balance: "+web3.utils.fromWei(balance)+" ETH"});
                                        web3.eth.getTransactionCount(web3.eth.defaultAccount).then(function(nonce){networkComponents[5].innerHTML="Nonce: "+nonce});
                                        web3.eth.getBalance(detailsData[1].innerHTML).then(function(balance){detailsData[3].innerHTML=web3.utils.fromWei(balance)+" ETH"});
                                        web3.eth.getTransactionCount(detailsData[1].innerHTML).then(function(nonce){detailsData[4].innerHTML=nonce});
                                }else{
                                        throw "The given network can not be set!"
                                }
                        }
                        catch(error){
                                window.alert(error);
                        }
        }
        function defaultAccountSetting(address){
                            web3.eth.defaultAccount=address;
                            web3.eth.getBalance(web3.eth.defaultAccount).then(function(balance){networkComponents[4].innerHTML="Balance: "+web3.utils.fromWei(balance)+" ETH"});
                            web3.eth.getTransactionCount(web3.eth.defaultAccount).then(function(nonce){networkComponents[5].innerHTML="Nonce: "+nonce});
        }
}else{
        window.location.href="Login.html";
}
                    