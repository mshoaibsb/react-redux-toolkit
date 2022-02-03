const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    username : {
        type: String,
        required: [true, "Please enter a username"]
    },
    email:{
        type: String,
        required: [true, "Please enter an email"]
    },
    hash: {
        type: String,
        select: false
    },
    salt: {
        type: String,
        select: false
    },
    role:{
        type: String,
        default: "user",
        enum: {
            values: ['user','client','admin'],
            message: '{VALUE} is not supported'
        }
    },
    resetPasswordToken: String,
    resetTokenExpire: Date,
})

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  };
  
UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
  };
// UserSchema.methods.toAuthJson = function(){
//     return {
//         _id: this._id,
//         username: this.username,
//         email: this.email,
//         role: this.role,
//     }
// }
UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const expiryDate = new Date(today);
    expiryDate.setDate(today.getDate() + 60);

    return jwt.sign({
        _id: this.id,
        email: this.email,
        role: this.role,
        exp: parseInt(expiryDate.getTime() / 1000, 10)

    }, process.env.JWT_SECRET)
}

const User =  mongoose.model('User', UserSchema)

module.exports = User;