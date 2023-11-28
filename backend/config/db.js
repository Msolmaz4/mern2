const mongoose = require('mongoose')
const Product = require('../models/product.js')
const seedData = require('../seed.js')

const db =async()=>{
    mongoose.connect(process.env.URL_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connect OKEY');
        
        Product.insertMany(seedData).then(() => {
            console.log('Insert OKEY');
           
        }).catch(err => {
            console.error(err);
           
        });
    }).catch(err => {
        console.error(err);
    });

}
module.exports =db