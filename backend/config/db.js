const mongoose = require('mongoose')

const db =()=>{
    mongoose.connect(process.env.URL_MONGO ,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log('concet OKEY')
    }).catch((err)=>console.log(err))
}
module.exports =db