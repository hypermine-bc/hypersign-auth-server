const User = require('../schema/user')
const responseHandeller = require('../common/responseHandeller.js')
const Pusher = require('pusher');

var pusher = new Pusher({
  appId: '570580',
  key: '46d2cb8ef7cf9dc2666d',
  secret: 'bd781cd91643f7caae29',
  cluster: 'ap2',
  encrypted: true
});

const getChallenge = (data) => {
  return new Promise((resolve, reject) => {
    /**
     * Need to add Company Id Check here
     */
    data.attributes.challenge = 'QUICKBROWNFOXJUMPOVERALAZYDOG'
    pusher.trigger('hypermine-hypersign', 'challenge-service', data.attributes)
    resolve({ "data": data.attributes, "message": "Challenge Generated" })
  })
}

module.exports.getChallenge = getChallenge