require('dotenv').config()
const nodemailer = require('nodemailer')
//console.log(process.env.mailpassword)
const sendEmail=async(options)=>{
const transporter = nodemailer.createTransport({

 service:process.env.service,
  auth: {
    user:process.env.email ,
    pass:process.env.mailPassword,
  },
});

let mailOption={
    from:process.env.email,
    to:options.email,
    subject:options.subject,
    html:options.html
}

await transporter.sendMail(mailOption);
}
module.exports = {sendEmail}