const User = require('../schema/user')
const responseHandeller = require('../common/responseHandeller.js')
const userAuth = async (data) => {
    const userInDb = await User.findOne({publicKey: data.publicKey, companyId: data.companyId});
    console.log(userInDb)
    if(userInDb){
        return {"data":userInDb.publicKey,"message":"User already exists", "status" : 0}
    }else{
        return new User({
            companyId: data.companyId,
            publicKey: data.publicKey,
            })
            .save()
            .then((newUser) => {
                return {"data":newUser,"message":"Sucessfully Registered", "status" : 1}
            })
    }
}

module.exports.userAuth = userAuth