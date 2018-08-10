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
            	pusher.trigger('hypermine-hypersign', 'auth-service', currentUser)
                return {"data":currentUser,"message":"Valid User"}
            } else {
                return {"data":{},"message":"Invalid User"}
            }
        })
}

module.exports.userAuth = userAuth