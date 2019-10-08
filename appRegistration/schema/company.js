const mongoose = require('mongoose')

const Schema = mongoose.Schema

const companySchema = new Schema({
    companyId: { type: String, required: true },
    companyName: { type: String, required: true },
    publicToken: { type: String, required: true },
    other: { type: String, required: false },
}, {timestamps: true, versionKey: false })

const Company = mongoose.model('company', companySchema)

module.exports = Company