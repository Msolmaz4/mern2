const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
        default:10
    },
    category:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
})

module.exports = mongoose.model('Product',productSchema)