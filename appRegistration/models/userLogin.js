import hsWallet from '../common/hypersign-wallet'
const User = require('../schema/user')
var Pusher = require('pusher');


var pusher = new Pusher({
  appId: '570580',
  key: '46d2cb8ef7cf9dc2666d',
  secret: 'bd781cd91643f7caae29',
  cluster: 'ap2',
  encrypted: true
});

const userAuth = (data) => {
    return User.findOne({publicToken: data.attributes.publicToken, companyId: data.attributes.companyId})
        .then((currentUser) => {
            if (currentUser) {
                let signedMsgRSV =  data.attributes.signedRsv
                let from = data.attributes.publicToken
                let rawMsg = data.attributes.rawMsg
                //verify signedMsg and get the public key
                // check if newPublicKey is equal to oldPublicKey
                let verifyPromise = hsWallet.verifyMessageTx(rawMsg, signedMsgRSV, from)
                verifyPromise.then((res) =>{
                    if(res){
                        console.log('userLogin : userAuth : Promise resolved. Successfully verfied.')    
                        pusher.trigger('hypermine-hypersign', 'auth-service', currentUser)
                        return {"data":currentUser,"message":"Valid User"}
                    }
                    else{
                        console.log('userLogin : userAuth : Promise resolved. Unverifed.')        
                        pusher.trigger('hypermine-hypersign', 'auth-service', currentUser)
                        return {"data":{},"message":"Invalid User"}
                    } 
                  } , (err) => {
                    console.log('userLogin : userAuth : Error Promise not resolved. Message = '+ err)
                }).catch((err) => {
                    console.log('userLogin : userAuth : Error in verifyPromise. Message = '+ err)
                })
            } else {
                return {"data":{},"message":"Invalid User"}
            }
        })
}

module.exports.userAuth = userAuth