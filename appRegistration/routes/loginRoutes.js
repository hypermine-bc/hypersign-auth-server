const router = require('express').Router()
const user = require('../models/userLogin')
const serialize = require('../common/serialize')

// user registration end point
router.post('/', (req, res) => {
    if(req.body){
        user.userAuth(req.body)
            .then((response) => {
                res.status(200)
                res.send(serialize.success(response))
            }).catch((err) => {
                console.log(`loginRoutes :: / : Error = ${err}`)
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