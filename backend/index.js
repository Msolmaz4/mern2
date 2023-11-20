const express = require('express')
const cors =require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const db = require('./config/db.js')
dotenv.config()
const app =express()
app.use(cors())
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cookieParser())
db()
//import {v2 as cloudinary} from 'cloudinary';
const cloudinary =require('cloudinary').v2
          
cloudinary.config({ 
  cloud_name: 'dwlrb5pp7', 
  api_key: '926353552136662', 
  api_secret:process.env.API_SECRET
});


const product = require('./routes/products.js')
const user = require('./routes/user.js')
app.use('/',product)
app.use('/',user)


app.get('/products',(req,res)=>{
    res.status(200).json({messsagr:'rota okey'})

})


const PORT =4000
app.listen(PORT,()=>{
    console.log('server 4000')
})
