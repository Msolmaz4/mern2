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



const product = require('./routes/products.js')
app.use('/',product)


app.get('/products',(req,res)=>{
    res.status(200).json({messsagr:'rota okey'})

})


const PORT =4000
app.listen(PORT,()=>{
    console.log('server 4000')
})
