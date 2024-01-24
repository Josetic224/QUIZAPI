// UserSignupModel.js

const mongoose = require('mongoose');

const userSignupSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profilePicture:{type: String},
    isVerified: { type: Boolean, default: false }, // Indicates if the user's email is verified
    isAdmin: { type: Boolean, default: false }, // Indicates if the user is an admin
    isSuperuser: { type: Boolean, default: false }, //indicates if the user is a superUser
    token: { type: String }, // Token for authentication, you may handle this separately
    // You may include additional fields such as name, date of birth, etc.
});

const userModel = mongoose.model('User', userSignupSchema);

module.exports = {userModel};
