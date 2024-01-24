const mongoose = require('mongoose')
require('dotenv').config()
let DB = process.env.DB

mongoose.connect(DB)
.then(()=>{
    console.log('database connected successfully')
})
.catch((error)=>{
    console.log(error.message)
})