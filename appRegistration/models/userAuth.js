const User = require('../schema/user')

const userAuth = (data) => {
            return new User({
                userName: data.attributes.userName,
                userEmail: data.attributes.userEmail,
                companyId: data.attributes.companyId,
                publicToken: data.attributes.publicToken,
                other: data.attributes.other
                })
                .save()
                .then((newUser) => {
                    return { response: 'Successfully Registered' }
                })     
}

module.exports.userAuth = userAuth