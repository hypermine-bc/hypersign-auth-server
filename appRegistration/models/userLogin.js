const User = require('../schema/user')
const pusher = require('../common/pusher.js')
const responseHandeller = require('../common/responseHandeller.js')
const userAuth = (data) => {
    return User.findOne({publicToken: data.attributes.publicToken, companyId: data.attributes.companyId})
        .then((currentUser) => {
            if (currentUser) {

            	//trigger it when the signedTraction is validated 
            	pusher.trigger('hypermine-hypersign', 'auth-service', currentUser)
                return { response: 'Valid User' }
            } else {
                return { response: 'InValid User' }
            }
        })
}

module.exports.userAuth = userAuth