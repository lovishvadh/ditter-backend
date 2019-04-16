const ditterSchema = require('../models/ditterSchema');

class Ditter {
    async addNewDitter(username, ditterText) {
        try {
            const ditter = new ditterSchema({
                username: username,
                ditterText
            });
            return await ditter.save();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getSingleUserDitter(username) {
        try {
            return await ditterSchema.find({
                username: username
            }).sort({
                timestamp: -1
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getDitterFeed(usernameArray) {
            try {
                let response = await ditterSchema.find({
                    username: {
                        $in: usernameArray
                    }
                }).sort({
                    timestamp: -1
                });
                return response;
            } catch (err) {
                console.log(err);
                throw err;
            }
    }
}

module.exports = new Ditter();