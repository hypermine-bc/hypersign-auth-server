const User = require('../schema/user')
const responseHandeller = require('../common/responseHandeller.js')
const userAuth = async (data) => {
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
            })
    }
}

module.exports.userAuth = userAuth