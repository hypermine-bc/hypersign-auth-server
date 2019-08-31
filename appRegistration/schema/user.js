const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    companyId: { type: String, required: true },
    publicKey: { type: String, required: true },
}, {timestamps: true, versionKey: false })

const User = mongoose.model('user', userSchema)

module.exports = User