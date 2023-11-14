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
    rating:{
        type:Number,
       default:0
    },
   image:[
    {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
   ],
   user:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:true
},
   reviews:[
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:true
        },
        name:{
            type:String,
            required:true
        },
        comment:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },

    }
   ]
},{timestamps:true})//guncellem ve olusturma tarihiyapar timestamaps

module.exports = mongoose.model('Product',productSchema)