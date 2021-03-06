const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
	},
    email: {
        type: String,
        unique: true,
        required: true,
    },
	password: {
        type: String,
        required: true,
	},
	followers: [String],
	following: [String]
});

module.exports = mongoose.model('User', userSchema);