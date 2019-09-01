const hsWallet = require('../common/hypersign-wallet')
const User = require('../schema/user')
const Session =  require('../schema/session')
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '570580',
  key: '46d2cb8ef7cf9dc2666d',
  secret: 'bd781cd91643f7caae29',
  cluster: 'ap2',
  encrypted: true
});

const userAuth = async (data) => {
    try{
        // get the ks session
        const sessionQuery = {ksSessionId : data.ksSessionId, companyId: data.companyId};
        const sessionIndb = await Session.findOne(sessionQuery)
        if(sessionIndb){
            // validate the challange
            if(sessionIndb.challange == data.challenge){                 
                // find the user 
                const userInDb = await User.findOne({publicKey: data.publicKey, companyId: data.companyId});
                if(userInDb){
                    const signedMsgRSV = data.signedRsv
                    const from = data.publicKey
                    const rawMsg = data.rawMsg
                    //verify signedMsg and get the public key
                    //check if newPublicKey is equal to oldPublicKey
                    const verifyTxResp = await hsWallet.verifyMessageTx(rawMsg, signedMsgRSV, from);
                    if(verifyTxResp){
                        // update the isAuth in session table
                        sessionIndb.isAuth = true;
                        sessionIndb.publicKey = from;
                        await Session.updateOne({_id: sessionIndb.id}, sessionIndb)
                        return {"data":{ksSessionId : sessionIndb.ksSessionId, publicKey : userInDb.publicKey, companyId : userInDb.companyId},"message":"Valid User","valid":true, "status" : 1}
                    }else{
                        return({ "data": {}, "message": "Invalid User", "valid": false , "status" : 0});
                    } 
                }else{
                    return ({"data":{},"message":"User does not exist", "status" : 0})                
                }
            }else{
                return({ "data": {}, "message": "Challange did not match", "valid": false , "status" : 0});
            }
        }else{
            return({ "data": {}, "message": "Invalid keycloak session", "valid": false , "status" : 0});
        }        
    }catch(e){
        console.log(`userLogin :: userAuth : error = ${e}`)
        return ({"data":{},"message":e.toString(), "status" : 0})                
    }    
}

module.exports.userAuth = userAuth