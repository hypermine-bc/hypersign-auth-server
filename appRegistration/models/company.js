const Comp = require('../schema/company')

const company = (data) => {
            return new Comp({
                companyId: data.attributes.companyId,
                companyName: data.attributes.companyName,
                publicToken: data.attributes.publicToken,
                other: data.attributes.other,
                })
                .save()
                .then((newUser) => {
                    return { response: 'Successfully Registered' }
                })     
}

module.exports.company = company