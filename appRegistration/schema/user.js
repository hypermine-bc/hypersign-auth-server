const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    companyId: { type: Number, required: true },
    publicToken: { type: String, required: true },
    other: { type: String, required: false },
}, {timestamps: true, versionKey: false })

const User = mongoose.model('user', userSchema)

module.exports = User