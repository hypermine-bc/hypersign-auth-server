const lightwallet =  require("eth-lightwallet")
var hypersign_wallet = {
    generate (password) {
        return new Promise((resolve,reject) => {
            if (password == '') {
                reject('Password is empty!')
            }
            let randomSeed = lightwallet.keystore.generateRandomSeed();
            ///give this randomSeed  to the user to save for restoring wallet
            console.log('Random Seed = ' +  randomSeed)            
            lightwallet.keystore.createVault({
                password: password,
                seedPhrase: randomSeed,
                hdPathString: "m/0'/0'/0'"
                }, (err, ks) => {
                    if(err) {
                        console.log('Error : error in callback of createVault. Msg = ' + err)
                        reject(err)
                    }
                    else {
                        window.key_Store = ks
                        resolve(randomSeed)
                    }
            })
        })
    },
    newAddresses(password, _addCnt) {
        return new Promise((resolve,reject) => {
            //debugger
            if (password == '') {
                reject('Password is empty!')
            }
            
            window.key_Store.keyFromPassword(password, (err, pwDerivedKey) => {
                //debugger
                if(err) reject(err)
                else {   
                    let numAddr = parseInt(_addCnt) //provide number of accounts you want to create
                    window.pwDerivedKey = pwDerivedKey  
                    window.key_Store.generateNewAddress(pwDerivedKey, numAddr);
                    var addresses = window.key_Store.getAddresses()
                    resolve(addresses);
                }
            })
        } )
    },
    setSeed(password, seed) {
        return new Promise((resolve, reject) => {
            /// Restoring keystore for login and restore 
            //debugger
            if (password == '') {
                reject('Password is empty!')
            }
            lightwallet.keystore.createVault({
                password: password,
                seedPhrase: seed,
                hdPathString: "m/0'/0'/0'"
                }, (err, ks) => {
                    if(err) reject(err)
                    else {
                        window.key_Store = ks
                        resolve()
                    }   
            })
        })
    },
    signMessageTx(from,rawMsg) {
        return new Promise((resolve, reject) =>{
            if(window.key_Store){
                if(window.pwDerivedKey){
                    let signedMsgRSV = lightwallet.signing.signMsg(window.key_Store, window.pwDerivedKey, rawMsg, from )
                    if(signedMsgRSV) resolve(signedMsgRSV)
                    else reject('Error : Error after singMsg call.')
                }else {
                    reject('Error : window.pwDerivedKey is null or empty.')        
                }
            }else {
                reject('Error : window.key_Store is null or empty.')    
            }
        })
    },
    verifyMessageTx(rawMessage, signedMsgRSV, publicKey){
        return new Promise((resolve, reject) => {
            console.log('hypersing-wallet : verifyMessageTx : Promise called.')    
            console.log('hypersing-wallet : verifyMessageTx : Before recover call.')   
            console.log('hypersing-wallet : verifyMessageTx : Before recover call. rawMessage : ' + rawMessage)    
            console.log('hypersing-wallet : verifyMessageTx : Before recover call. signedMsgRSV.v : ' + signedMsgRSV.v)    
            console.log('hypersing-wallet : verifyMessageTx : Before recover call. signedMsgRSV.r : ' + signedMsgRSV.r)    
            console.log('hypersing-wallet : verifyMessageTx : Before recover call. signedMsgRSV.s : ' + signedMsgRSV.s)    
            let newpublicKeyUint8Arr = lightwallet.signing.recoverAddress(rawMessage, signedMsgRSV.v, signedMsgRSV.r.data, signedMsgRSV.s.data)
            console.log('hypersing-wallet : verifyMessageTx : After recover call. newpublicKeyUint8Arr ' + newpublicKeyUint8Arr)  
            
            console.log('hypersing-wallet : verifyMessageTx : Before toHexString call.') 
            let newpublicKey = this.toHexString(newpublicKeyUint8Arr)
            console.log('hypersing-wallet : verifyMessageTx : After toHexString call.')  


            console.log('hypersing-wallet : verifyMessageTx : newpublicKey : ' + newpublicKey)    
            if(publicKey === '0x' + newpublicKey) {
                console.log('hypersing-wallet : verifyMessageTx : Inside if')    
                resolve(true)
            } 
            else {
                console.log('hypersing-wallet : verifyMessageTx : Inside else')    
                reject(false)
            }
        })
    },
    toHexString(byteArray) {
        return Array.prototype.map.call(byteArray, function(byte) {
          return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
    }
}


module.exports = hypersign_wallet 
