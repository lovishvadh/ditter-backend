const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ditterSchema = new Schema({
	username: {
		type: String,
		required: true
	},
    timestamp: {
                type: Date,
                default: Date.now
            },
	ditterText: {
		type: String,
		required: true
	},
})

module.exports = mongoose.model('Ditter', ditterSchema)