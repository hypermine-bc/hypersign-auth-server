const Comp = require('../schema/company')
const callPusher =  require('../common/pusher.js')
const company = (data) => {
            return new Comp({
                companyId: data.attributes.companyId,
                companyName: data.attributes.companyName,
                publicToken: data.attributes.publicToken,
                other: data.attributes.other,
                })
                .save()
                .then((newUser) => {
                    // console.log(callPusher.callPusher.notify({},'ddd','ddd'))
                   // pusher.notify('hypermine-hypersign', 'auth-service', newUser)
                    return {"data":newUser,"message":"Company Registered"}
                })     
}

module.exports.company = company