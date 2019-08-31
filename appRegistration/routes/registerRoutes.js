const router = require('express').Router()
const user = require('../models/userAuth')
const serialize = require('../common/serialize')
// const {formattedResponse} = require('../common/util')

// user registration end point
router.post('/', (req, res) => {
    if(req.body){
        user.userAuth(req.body)
            .then((response) => {
                res.status(200)
                res.send(serialize.success(response))
            }).catch((err) => {
                res.status(400)
                res.send(serialize.error(err))
            })
    } else {
        res.status(400)
        res.send(serialize.error())
    }
})


router.get('/', (req, res) => {
    res.send('App is working now')
})

module.exports = router