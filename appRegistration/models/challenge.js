const Session = require('../schema/session')
const responseHandeller = require('../common/responseHandeller.js')
const Pusher = require('pusher');
const uuidv1 = require('uuid/v1');

const getChallenge = async (data) => {
  try{
    if(data.kcSessionId && data.companyId){
      const ksSessionId = data.kcSessionId;
      const companyId = data.companyId; // TODO : Need to add Company Id Check here
      const challange = uuidv1();
      // check if session is already there
      const sessionInDb = await Session.findOne({ksSessionId: ksSessionId, companyId: companyId});
      if(sessionInDb){
          return {"data":sessionInDb.ksSessionId,"message":"Session already exists", "status" : 0}
      }else{
          return new Session({
                companyId: companyId,
                publicKey: "",
                ksSessionId: ksSessionId,
                challange: challange,
                isAuth: false,
              })
              .save()
              .then((newSession) => {
                  return {"data":newSession,"message":"Sucessfully session created", "status" : 1}
              }).catch((err) => {
                  console.log(`challange :: getChallenge : Error = ${err}`)
              })
      }
    }
  }catch(e){
    console.log(e)
  }
}

module.exports.getChallenge = getChallenge