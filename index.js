const express = require('express')
require('dotenv').config()
require('./config/config')
const fileUpload = require('express-fileupload');
const signRouter = require('./router/registerRoute')
const quizRouter = require('./router/quizRoutes')
const superUserRouter = require('./router/superRoutes')
const app = express()

app.use(
    fileUpload({
      useTempFiles: true
    })
);

app.use(express.json())
app.use(signRouter)
app.use(quizRouter)
app.use(superUserRouter)
let port = process.env.PORT
app.listen(port,()=>{
    console.log('server running on port '+port)
})