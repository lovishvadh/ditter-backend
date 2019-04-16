const userSchema = require('../models/userSchema');
const encryptionUtils = require('../modules/encryptionUtils');
class User {
    async signUpUser({
        username,
        password,
        email,
        firstName,
        lastName
    }) {
        try {
            const newUser = new userSchema({
                firstName,
                lastName,
                username: encryptionUtils.encryptUsername(username),
                password: encryptionUtils.encryptPassword(password),
                email: encryptionUtils.encryptEmail(email),
            });
            let response = await newUser.save();
            if (response.id) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async validateDuplicateEmail(email) {
        try {
            return await userSchema.findOne({
                email: encryptionUtils.encryptEmail(email)
            });

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async validateDuplicateUsername(username) {
        try {
            return await userSchema.findOne({
                username: encryptionUtils.encryptUsername(username)
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async validateLogin(username, password) {
        try {
            return await userSchema.findOne({
                username: encryptionUtils.encryptUsername(username),
                password: encryptionUtils.encryptPassword(password)
            });
         

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async follow(username, userToFollow) {
        try {
            let encryptedUsername = encryptionUtils.encryptUsername(username);
            let encryptedUserToFollow = encryptionUtils.encryptUsername(userToFollow);
            let response = await userSchema.findOneAndUpdate({
                username: encryptedUsername
            }, {
                $push: {
                    following: encryptedUserToFollow
                }
            }, {
                new: true
            });
            if (response) {
                await userSchema.findOneAndUpdate({
                    username: encryptedUserToFollow
                }, {
                    $push: {
                        followers: encryptedUsername
                    }
                }, {
                    new: true
                });
            }
        } catch (err) {
            throw err;
        }
    }

    async unfollow(username, userToUnfollow) {
        try {
            let encryptedUsername = encryptionUtils.encryptUsername(username);
            let encryptedUserToUnfollow = encryptionUtils.encryptUsername(userToUnfollow);
            let response = await userSchema.findOneAndUpdate({
                username: encryptedUsername
            }, {
                $pull: {
                    following: encryptedUserToUnfollow
                }
            }, {
                new: true
            });
            if (response) {
                await userSchema.findOneAndUpdate({
                    username: encryptedUserToUnfollow
                }, {
                    $pull: {
                        followers: encryptedUsername
                    }
                }, {
                    new: true
                });
            }
        } catch (err) {
            throw err;
        }
    }

    async searchUser(searchQuery) {
        try {
            let userData = await userSchema.findOne({
                $or: [{
                        email: encryptionUtils.encryptEmail(searchQuery)
                    },
                    {
                        username: encryptionUtils.encryptUsername(searchQuery)
                    }
                ]
            });
            if(userData) {
                return {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    username: encryptionUtils.decryptUsername(userData.username),
                    followers: userData.followers.map((ele)  => encryptionUtils.decryptUsername(ele)),
                    following: userData.following.map((ele)  => encryptionUtils.decryptUsername(ele)),
                }
            } else {
                return {};
            }
        } catch (err) {
            throw err;
        }
    }
    async getFollowing(username) {
        try {
            let {following} = await userSchema.findOne({
                username: encryptionUtils.encryptUsername(username)
            });
            return following.map(ele => encryptionUtils.decryptUsername(ele));
        } catch (err) {
            throw err;
        }
    }

    async duplicateFollowRequest(username,userToFollow) {
        try {
            let response = await userSchema.findOne({
                username: encryptionUtils.encryptUsername(username),
                following: encryptionUtils.encryptUsername(userToFollow)
            });
            return response;
        } catch (err) {
            throw err;
        }
    }

    async duplicateUnfollowRequest(username,userToFollow) {
        try {
            let response = await userSchema.findOne({
                username: encryptionUtils.encryptUsername(username),
                following: encryptionUtils.encryptUsername(userToFollow)
            });
            return response;
        } catch (err) {
            throw err;
        }
    }

    async validateUserExists(username) {
        try {
            let response = await userSchema.findOne({
                username: encryptionUtils.encryptUsername(username),
            });
            return response;
        } catch (err) {
            throw err;
        }
    }

    async getAllUsers() {
        try {
            let response =  await userSchema.find();
            return response.map((ele)  => {
                return {
                    username: encryptionUtils.decryptUsername(ele.username),
                    firstName: ele.firstName,
                    lastName: ele.lastName,
                    followers: ele.followers,
                    following: ele.following
                }
            })
        } catch (err) {
            throw err;

        }
    }

}
let i = new User();
i.getAllUsers();
module.exports = new User();