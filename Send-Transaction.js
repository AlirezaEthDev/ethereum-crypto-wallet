const JSsha3=require("js-sha3");
const sha3_256=JSsha3.sha3_256;
const authPad=localStorage.getItem("walletAuthStatus");
const passwordHash=authPad.slice(0,64);
const statusPad=authPad.slice(64);
const status="b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12bfcbcf165908dd18a9e49f7ff27810176db8e9f63b4352213741664245224f8aa";
      if(sha3_256(passwordHash+status.slice(0,64))==statusPad){
const Web3=require("web3");
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
            const mainWallet=web3.eth.accounts.wallet;//To create horizontal bar, Account information should be gotten from this.
            const from=document.getElementById("from");
            const accountsList=document.getElementById("accountsList");
            const to=document.getElementById("to");
            const ethValue=document.getElementById("ethValue");
            const gas=document.getElementById("gas");
            const gasPrice=document.getElementById("gasPrice");
            const totalCost=document.getElementById("totalCost");
            const sendButton=document.getElementById("sendButton");
            const transaction={}
                  mainWallet.load(statusPad);
            const connectedNetwork=document.getElementById("connectedNetwork");
            const walletAccount=document.getElementById("walletAccount");
            const walletAccountsList=document.getElementById("walletAccountsList");
            const networkComponents=document.getElementsByClassName("horizontalItem");
            let indexOfSelectedAccount;
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
                  sendButton.addEventListener("click", sendETH);
                  from.addEventListener("change", setFromByDatalist);
                  ethValue.addEventListener("change", function(){this.value=parseFloat(this.value)});
                  gasPrice.addEventListener("change", function(){this.value=parseFloat(this.value)});
                  totalCost.addEventListener("change", function(){this.value=parseFloat(this.value)});
                  for(let i=0; i<mainWallet.length; i++){
                      let Option=document.createElement("option");
                          Option.value="Index: "+mainWallet[i].index+" >> "+"Address: "+mainWallet[i].address;
                          accountsList.appendChild(Option);
                  }
                    function sendETH(){
                        transaction.from= web3.utils.toChecksumAddress(from.value);
                        transaction.to= web3.utils.toChecksumAddress(to.value);
                        transaction.value= web3.utils.toWei(ethValue.value);
                        for(let i=0; i<accountsList.options.length; i++){
                            if(from.value==accountsList.options[i].value.slice(21)){
                                indexOfSelectedAccount=parseInt(accountsList.options[i].value.slice(6,8));
                                break;
                            }
                        }
                        if(from.value!=""&&to.value!=""&&ethValue.value!=""){
                            if(gas.value==""&&gasPrice.value=="") {
                                web3.eth.estimateGas(transaction).then(function(gasValue){
                                    web3.eth.getGasPrice().then(function(gasPriceValue){
                                        gas.value=gasValue;
                                        transaction.gas=gasValue;
                                        gasPrice.value=web3.utils.fromWei(gasPriceValue);
                                        transaction.gasPrice=gasPriceValue;
                                        totalCost.value=web3.utils.fromWei((parseInt(transaction.value)+parseInt((transaction.gas*transaction.gasPrice))).toString());
                                        web3.eth.getBalance(transaction.from).then(function(balance){
                                            if(totalCost.value>parseFloat(web3.utils.fromWei(balance))){
                                                window.alert("Sender's balance is not enough than total cost!\nThe balance is "+web3.utils.fromWei(balance)+" ETH");
                                            }else{
                                                if(window.confirm("Are you sure about send this transaction?\nA sent cryptocurrency and token never can be refund!")){
                                                        web3.eth.accounts.signTransaction(transaction,mainWallet[indexOfSelectedAccount].privateKey).then(function(signedTransaction){
                                                            web3.eth.sendSignedTransaction(signedTransaction.rawTransaction, function(error){if(error) throw error}).then(function(data){
                                                                web3.eth.getTransactionFromBlock(data.blockHash,data.transactionIndex).then(function(txObject){
                                                                    localStorage.setItem("blockHash", data.blockHash);
                                                                    localStorage.setItem("blockNumber", data.blockNumber);
                                                                    localStorage.setItem("transactionHash", data.transactionHash);
                                                                    localStorage.setItem("transactionIndex", data.transactionIndex);
                                                                    localStorage.setItem("status", data.status);
                                                                    localStorage.setItem("from", data.from);
                                                                    localStorage.setItem("to", data.to);
                                                                    localStorage.setItem("value",web3.utils.fromWei(txObject.value)+" ETH");
                                                                    localStorage.setItem("gasUsed", data.gasUsed);
                                                                    localStorage.setItem("gasPrice",web3.utils.fromWei(txObject.gasPrice)+" ETH");
                                                                    localStorage.setItem("totalCost",web3.utils.fromWei((parseInt(txObject.value)+parseInt(data.gasUsed*txObject.gasPrice)).toString())+" ETH");
                                                                    localStorage.setItem("network", providerToNetwork.get(web3.eth.currentProvider.url));
                                                                    window.location.href="Successfull-Transaction-Receipt.html"
                                                                });
                                                            });
                                                        });
                                                }
                                            }
                                        })
                                    })
                                })
                            }else if(gas.value==""&&gasPrice.value!=""){
                                web3.eth.estimateGas(transaction).then(function(gasValue){
                                    gas.value=gasValue;
                                    transaction.gas=gasValue;
                                    gasPrice.value=parseFloat(gasPrice.value).toFixed(18);
                                    transaction.gasPrice=web3.utils.toWei(gasPrice.value);
                                    totalCost.value=web3.utils.fromWei((parseInt(transaction.value)+parseInt((transaction.gas*transaction.gasPrice))).toString());
                                    web3.eth.getBalance(transaction.from).then(function(balance){
                                        if(totalCost.value>parseFloat(web3.utils.fromWei(balance))){
                                            window.alert("Sender's balance is not enough than total cost!\nThe balance is "+web3.utils.fromWei(balance)+" ETH");
                                        }else{
                                            if(window.confirm("Are you sure about send this transaction?\nA sent cryptocurrency and token never can be refund!")){
                                                web3.eth.accounts.signTransaction(transaction,mainWallet[indexOfSelectedAccount].privateKey).then(function(signedTransaction){
                                                    web3.eth.sendSignedTransaction(signedTransaction.rawTransaction, function(error){if(error) throw error}).then(function(data){
                                                        web3.eth.getTransactionFromBlock(data.blockHash,data.transactionIndex).then(function(txObject){
                                                            localStorage.setItem("blockHash", data.blockHash);
                                                            localStorage.setItem("blockNumber", data.blockNumber);
                                                            localStorage.setItem("transactionHash", data.transactionHash);
                                                            localStorage.setItem("transactionIndex", data.transactionIndex);
                                                            localStorage.setItem("status", data.status);
                                                            localStorage.setItem("from", data.from);
                                                            localStorage.setItem("to", data.to);
                                                            localStorage.setItem("value",web3.utils.fromWei(txObject.value)+" ETH");
                                                            localStorage.setItem("gasUsed", data.gasUsed);
                                                            localStorage.setItem("gasPrice",web3.utils.fromWei(txObject.gasPrice)+" ETH");
                                                            localStorage.setItem("totalCost",web3.utils.fromWei((parseInt(txObject.value)+parseInt(data.gasUsed*txObject.gasPrice)).toString())+" ETH");
                                                            localStorage.setItem("network", providerToNetwork.get(web3.eth.currentProvider.url));
                                                            window.location.href="Successfull-Transaction-Receipt.html";
                                                        });
                                                    });
                                                });
                                            }
                                        }
                                    })
                                })
                            }else if(gas.value!=""&&gasPrice.value==""){
                                web3.eth.getGasPrice().then(function(gasPriceValue){
                                    transaction.gas=gas.value;
                                    gasPrice.value=web3.utils.fromWei(gasPriceValue);
                                    transaction.gasPrice=gasPriceValue;
                                    totalCost.value=web3.utils.fromWei((parseInt(transaction.value)+parseInt((transaction.gas*transaction.gasPrice))).toString());
                                    web3.eth.getBalance(transaction.from).then(function(balance){
                                        if(totalCost.value>parseFloat(web3.utils.fromWei(balance))){
                                            window.alert("Sender's balance is not enough than total cost!\nThe balance is "+web3.utils.fromWei(balance)+" ETH");
                                        }else{
                                            if(window.confirm("Are you sure about send this transaction?\nA sent cryptocurrency and token never can be refund!")){
                                                web3.eth.accounts.signTransaction(transaction,mainWallet[indexOfSelectedAccount].privateKey).then(function(signedTransaction){
                                                    web3.eth.sendSignedTransaction(signedTransaction.rawTransaction, function(error){if(error) throw error}).then(function(data){
                                                        web3.eth.getTransactionFromBlock(data.blockHash,data.transactionIndex).then(function(txObject){
                                                            localStorage.setItem("blockHash", data.blockHash);
                                                            localStorage.setItem("blockNumber", data.blockNumber);
                                                            localStorage.setItem("transactionHash", data.transactionHash);
                                                            localStorage.setItem("transactionIndex", data.transactionIndex);
                                                            localStorage.setItem("status", data.status);
                                                            localStorage.setItem("from", data.from);
                                                            localStorage.setItem("to", data.to);
                                                            localStorage.setItem("value",web3.utils.fromWei(txObject.value)+" ETH");
                                                            localStorage.setItem("gasUsed", data.gasUsed);
                                                            localStorage.setItem("gasPrice",web3.utils.fromWei(txObject.gasPrice)+" ETH");
                                                            localStorage.setItem("totalCost",web3.utils.fromWei((parseInt(txObject.value)+parseInt(data.gasUsed*txObject.gasPrice)).toString())+" ETH");
                                                            localStorage.setItem("network", providerToNetwork.get(web3.eth.currentProvider.url));
                                                            window.location.href="Successfull-Transaction-Receipt.html";
                                                        });
                                                    });
                                                });
                                            }
                                        }
                                    })
                                })
                            }else if(gas.value!=""&&gasPrice.value!=""){
                                transaction.gas=gas.value;
                                gasPrice.value=parseFloat(gasPrice.value).toFixed(18);
                                transaction.gasPrice=web3.utils.toWei(gasPrice.value);
                                totalCost.value=web3.utils.fromWei((parseInt(transaction.value)+parseInt((transaction.gas*transaction.gasPrice))).toString());
                                web3.eth.getBalance(transaction.from).then(function(balance){
                                    if(totalCost.value>parseFloat(web3.utils.fromWei(balance))){
                                        window.alert("Sender's balance is not enough than total cost!\nThe balance is "+web3.utils.fromWei(balance)+" ETH");
                                    }else{
                                        if(window.confirm("Are you sure about send this transaction?\nA sent cryptocurrency and token never can be refund!")){
                                            web3.eth.accounts.signTransaction(transaction,mainWallet[indexOfSelectedAccount].privateKey).then(function(signedTransaction){
                                                web3.eth.sendSignedTransaction(signedTransaction.rawTransaction, function(error){if(error) throw error}).then(function(data){
                                                    web3.eth.getTransactionFromBlock(data.blockHash,data.transactionIndex).then(function(txObject){
                                                        localStorage.setItem("blockHash", data.blockHash);
                                                        localStorage.setItem("blockNumber", data.blockNumber);
                                                        localStorage.setItem("transactionHash", data.transactionHash);
                                                        localStorage.setItem("transactionIndex", data.transactionIndex);
                                                        localStorage.setItem("status", data.status);
                                                        localStorage.setItem("from", data.from);
                                                        localStorage.setItem("to", data.to);
                                                        localStorage.setItem("value",web3.utils.fromWei(txObject.value)+" ETH");
                                                        localStorage.setItem("gasUsed", data.gasUsed);
                                                        localStorage.setItem("gasPrice",web3.utils.fromWei(txObject.gasPrice)+" ETH");
                                                        localStorage.setItem("totalCost",web3.utils.fromWei((parseInt(txObject.value)+parseInt(data.gasUsed*txObject.gasPrice)).toString())+" ETH");
                                                        localStorage.setItem("network", providerToNetwork.get(web3.eth.currentProvider.url));
                                                        window.location.href="Successfull-Transaction-Receipt.html";
                                                    });
                                                });
                                            });
                                        }
                                    }
                                });
                            }
                     
                        }else{
                            window.alert("You should fill From, To and Value!");
                        }
                    }

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
                function setFromByDatalist(){
                    for(let i=0; i<accountsList.options.length; i++){
                        if(from.value==accountsList.options[i].value){
                            from.value=accountsList.options[i].value.slice(21);
                            break;
                        }
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
                function networkShifting(networkName){
                    try{
                            if(web3.setProvider(networkToProvider.get(networkName))){
                                    web3.eth.getChainId().then(function(ID){networkComponents[1].innerHTML="Chain ID: "+ID;})
                                    networkComponents[2].innerHTML="Provider: "+web3.eth.currentProvider.url;
                                    web3.eth.getBalance(web3.eth.defaultAccount).then(function(balance){networkComponents[4].innerHTML="Balance: "+web3.utils.fromWei(balance)+" ETH"});
                                    web3.eth.getTransactionCount(web3.eth.defaultAccount).then(function(nonce){networkComponents[5].innerHTML="Nonce: "+nonce});
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