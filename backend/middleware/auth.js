const User =require('../models/user.js')
const jwt = require('jsonwebtoken')


const authenticationMid = async(req,res,next)=>{
    try {
        // console.log(req.body);
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token)
        
        if (!token) {
            return res.status(500).json({ message: 'Lütfen giriş yapınız' });
        }

        const decodeData = jwt.verify(token, process.env.SECRET);

        if (!decodeData) {
            return res.status(500).json({ message: 'Geçersiz token' });
        }

        req.user = await User.findById(decodeData.id);
        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(500).json({ message: 'Yetkilendirme hatası' });
    }
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