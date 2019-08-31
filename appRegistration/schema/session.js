const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sessionSchema = new Schema({
    companyId: { type: String, required: true },
    publicKey: { type: String, required: false },
    ksSessionId: { type: String, required: true },
    challange: { type: String, required: true },
    isAuth: { type: Boolean, required: true },
}, {timestamps: true, versionKey: false })

const Session = mongoose.model('session', sessionSchema)

module.exports = Session