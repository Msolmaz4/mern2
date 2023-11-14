const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cloudinary =require('cloudinary').v2

const register = async(req,res)=>{
    
    const avatar = await cloudinary.uploader.upload(req.body.avatar,{
        folder:'avatar',
        width:130,
        crop:'scale'
    })

    const {name,email,password} = req.body 
    const user= await User.findOne({email})
    if(user) {
        return res.status(500).json({message:'die Emailhat schon'})
    }
    const passwordHash = await bcrypt.hash(password,10)
    if(password.length < 6){
        return res.status(500).json({message:'password ist kurty'})
    }
    const newUser = await User.create({
        name,
        email,
        password:passwordHash,
     avatar:{
        public_id:avatar.public_id,
        url:avatar.secure_url
     }
    })
    const token = await jwt.sign({id:newUser._id},process.env.SECRET,{expiresIn:'1h'});

    const cookieOptions = {
        httpOnly:true,
        expires:new Date(Date.now() + 5 *24*60*60*1000)
    }
    res.status(201).cookie('token',token,cookieOptions).json({
        newUser,token
    })
}
const login = async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.status(500).json({
            message:'leider kann es nict email finden'
        })
    }
    const  comparePassword = await bcrypt.compare(password ,user.password)
    if(!comparePassword){
        return  res.status(200).json({message:'flase password'})
    }
   
    const token = await jwt.sign({id:user._id},process.env.SECRET,{expiresIn:'1h'});

    const cookieOptions = {
        httpOnly:true,
        expires:new Date(Date.now())
    }
    res.status(201).cookie('token',token,cookieOptions).json({
        user,token
    })
}
const logout = async(req,res)=>{
    const cookieOptions = {
        httpOnly:true,
        expires:new Date(Date.now( + 5 *24*60*60*1000))
    }
    res.status(200).cookie('token',null,cookieOptions).json({
        message:'raus okey'
    })
}
const forgotPassword = async(req,res)=>{

}
const resetPassword = async(req,res)=>{

}


module.exports = {
    register,login,forgotPassword,resetPassword,logout
}