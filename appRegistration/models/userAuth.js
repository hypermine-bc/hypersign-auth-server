const User = require('../schema/user')
const responseHandeller = require('../common/responseHandeller.js')
const userAuth = async (data) => {
    try{
        const userInDb = await User.findOne({publicKey: data.publickey, companyId: data.companyid});
        if(userInDb){
            return {"data":userInDb.publicKey,"message":"User already exists", "status" : 0}
        }else{
            return new User({
                companyId: data.companyid,
                publicKey: data.publickey,
                })
                .save()
                .then((newUser) => {
                    return {"data":newUser,"message":"Sucessfully Registered", "status" : 1}
                }).catch((err) => {
                    console.log(`userAuth :: userAuth : Error = ${err}`)
                    return {"data":{},"message": err.toString(), "status" : 0}
                })
        }
    }catch(e){
        console.log(`userAuth :: userAuth : Error = ${e}`)
        return {"data":{},"message": e.toString(), "status" : 0}
    }
}

module.exports.userAuth = userAuth