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
    pusher.trigger('hypermine-hypersign', 'tx-service', data.attributes)
    return {"data":data.attributes,"message":"Transaction Notified"}
}

module.exports.userAuth = userAuth