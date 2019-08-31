const router = require('express').Router()
const challenge = require('../models/challenge')
const serialize = require('../common/serialize')
// user registration end point
router.post('/', (req, res) => {
  if (req.body) {
    try{
        challenge.getChallenge(req.body)
          .then((response) => {
            res.status(200)
            res.send(serialize.success(response))
          }).catch((err) => {
            res.status(400)
            res.send(serialize.error(err))
          })
      }catch (err) {
        console.log(`challengeRoutes :: / : ${JSON.stringify(err)}`)
      }
  } else {
    res.status(400)
    res.send(serialize.error())
  }
})



router.get('/', (req, res) => {
    res.send('App is working now')
})

module.exports = router