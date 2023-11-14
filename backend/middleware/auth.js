const User =require('../models/user.js')
const jwt = require('jsonwebtoken')


const authenticationMid = async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.status(500).json({message:'bitte login anmelden'})
    }
    const decodeData = jwt.verify(token,process.env.SECRET)
    if(!decodeData){
        return res.status(500).json({message:'token geht nixgt'})
    }
    req.user = await User.findById(decodeData.id)
   next()
}
 const roleChecked = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(500).json({
                message:'nicht erlauben'
            })
        } next()
    }
 }

module.exports ={authenticationMid,roleChecked}