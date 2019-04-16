const userModule = require('../modules/user')

class UserValidator {
    constructor() {
        this.regex = {
          email: /^[a-zA-Z0-9-_.+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          username: /^[a-zA-Z0-9-_.@$+]{4,16}$/,
          password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,15}$/,
          name: /^[a-zA-Z. -]{1,40}$/,
        };
    }

    async validateLoginData(body) {
        let validationErrors = [];
        if(!body.username) {
            validationErrors.push('Username is required');
        }
        if(!body.password) {
            validationErrors.push('Password is required');
        }
        if(!validationErrors.length) {
            if(!(await userModule.validateLogin(body.username,body.password))) {
                validationErrors.push('Wrong username or password');
            }
        }
        return validationErrors;
    }

    async validateSignUpData(body) {
        let validationErrors = [];
        if(!body.username.match(this.regex.username)) {
            validationErrors.push('Invalid username. Username must have atleast 4 characters and maximum 16 characters.You can use letters,numbers and -_.@$+');
        }
        if(!body.password.match(this.regex.password)) {
            validationErrors.push('Invalid password. Password should be atleast 6 characters and max 15 characters and must contain a capital letter, a small letter a number and one special character.');
        }
        if(!body.firstName.match(this.regex.name)) {
            validationErrors.push('Invalid first name');
        }
        if(!body.email.match(this.regex.email)) {
            validationErrors.push('Invalid email');
        }
        if(await userModule.validateDuplicateUsername(body.username)) {
            validationErrors.push('Username already exists');
        }
        if(await userModule.validateDuplicateEmail(body.email)) {
            validationErrors.push('Email already exists');
        }
        return validationErrors;
    }

    async validateFollowRequest(username,userToFollow) {
        let validationErrors = [];
        if(await userModule.duplicateFollowRequest(username,userToFollow)) {
            validationErrors.push('Already follow the user');
        }
        if(!(await userModule.validateUserExists(userToFollow))) {
            validationErrors.push('User does not exist');
        }
        return validationErrors;
    }

    async validateUnfollowRequest(username,userToUnfollow) {
        let validationErrors = [];
        if(!(await userModule.duplicateUnfollowRequest(username,userToUnfollow))) {
            validationErrors.push('You don\'t follow this user');
        }
        if(!(await userModule.validateUserExists(userToUnfollow))) {
            validationErrors.push('User does not exist');
        }
        return validationErrors;
    }
}

module.exports = new UserValidator();