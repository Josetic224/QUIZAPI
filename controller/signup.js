const { userModel } = require('../model/user');
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {sendEmail} = require('../utilities/nodemailer')
const generateDynamicEmail= require('../client/html')
//disallow certain characters for the username
// const isUsernameValid = (username) => {
//     // Define a regular expression to allow only alphanumeric characters and underscores
//     const allowedCharacters = /^[a-zA-Z0-9_]+$/;
//     return allowedCharacters.test(username);
// };

const registerUser = async (req, res) => {
    
    try {
        let { username, email, password } = req.body;

        // Check if the body is empty
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: false,
                message: 'Body is empty',
            });
        }

        // Check if user exists via email
        const emailExists = await userModel.findOne({ email });

        if (emailExists) {
            return res.status(400).json({
                status: false,
                message: 'User with this email already exists',
            });
        }

        // Check if the username has been taken
        const usernameExists = await userModel.findOne({ username });

        if (usernameExists) {
            return res.status(400).json({
                status: false,
                message: 'Username already in use',
            });
        }

        // Continue with user registration logic here...
//hash the password
//generate salt 
const salt =  bcrypt.genSaltSync(12)
//then hash the password
const hashPassword =  bcrypt.hashSync(password, salt)
//use jwt token to sign the user
let token = jwt.sign({
    username:username,
    email:email,
    }, process.env.JWT_SECRET, { expiresIn: "300s" });


    let newUser = new userModel({
        username,
        email,
        password :hashPassword,
        token,
        createdAt: Date.now(),
    })
         const savedUser = await newUser.save();
        console.log('user registered successfully');

        const subject = `kindly verify your account`;
    const link = `${req.protocol}://${req.get("host")}/verify/${savedUser._id}/${savedUser.token}`;
    const html = generateDynamicEmail(link, username);

    sendEmail({
        email,
        subject,
        html,
      });
     
    res.status(200).json({
            status: true,
            message: `congratulations ${username}, registration successful!. 
            click the link sent to your email to verify your account!`,
            data:savedUser
        });
  
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

module.exports = {
    registerUser,
};
