const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cloudinary =require('cloudinary').v2
const crypto= require('crypto')
const nodemailer = require("nodemailer");

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
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(404).json({message:'leider haben wir nicht dieseEmail gefunden'})
    }
    const resetToken =  crypto.randomBytes(20).toString('hex')
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    user.resetPasswordExpire= Date.now() + 5*60*1000
    await user.save({validateBeforeSave:false})

    const passwordUrl = `${req.protocol}://${req.get('host')}/reset/${resetToken}`
    const message = `password token:${passwordUrl}`
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.forwardemail.net",
            service:'gmail',
            port: 465,
            secure: true,
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              //https://nodemailer.com/about/ burdan aldim
              user: 'REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM',
              pass: 'REPLACE-WITH-YOUR-GENERATED-PASSWORD'
            }
          })
          const mailData = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
             to: req.body.email, // list of receivers
              subject: "passoerd woiderholen", // Subject line
                 text: message, // plain text body
             
          }
          await transporter.sendMail(mailData)
          res.status(200).json({
            message:'email gucken'
          })
    } catch (error) {
        user.resetPasswordToken=undefined
        user.resetPasswordExpire= undefined
        await user.save({validateBeforeSave:false})
        res.status(401).json({message:error.message})
    }

}
const resetPassword = async(req,res)=>{
    const resetPasswordToken =crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!user){
        return res.status(400).json({
            message:'leider token'
        })
    }
    user.password = req.body.password
    user.resetPasswordToken=undefined
    user.resetPasswordExpire= undefined
    await user.save()
    const token = await jwt.sign({id:user._id},process.env.SECRET,{expiresIn:'1h'});

    const cookieOptions = {
        httpOnly:true,
        expires:new Date(Date.now() + 5 *24*60*60*1000)
    }
    res.status(201).cookie('token',token,cookieOptions).json({
        user,token
    })
}
const userDetail = async(req,res,next)=>{
    const user = await User.findById(req.params.id)
    res.status(200).json({
        user
    })
}


module.exports = {
    register,login,forgotPassword,resetPassword,logout,userDetail
}