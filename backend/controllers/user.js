const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

const nodemailer = require("nodemailer");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    const avatar = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "avatar",
      width: 130,
      crop: "scale",
    });

    const user = await User.findOne({ email });
    if (user) {
      return res.status(500).json({ message: "die Emailhat schon" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    if (password.length < 6) {
      return res.status(500).json({ message: "password ist kurty" });
    }
    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
      avatar: {
        public_id: avatar.public_id,
        url: avatar.secure_url,
      },
    });
    const token = await jwt.sign({ id: newUser._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    };
    res.status(201).cookie("token", token, cookieOptions).json({
      newUser,
      token,
    });
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ message: "Beklenmeyen bir hata oluştu" });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(500).json({
      message: "leider kann es nict email finden",
    });
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return res.status(200).json({ message: "flase password" });
  }

  const token = await jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: "1h",
  });

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now()),
  };
  res.status(201).cookie("token", token, cookieOptions).json({
    user,
    token,
  });
};
const logout = async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now(+5 * 24 * 60 * 60 * 1000)),
  };
  res.status(200).cookie("token", null, cookieOptions).json({
    message: "raus okey",
  });
};


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email, "ilk");
    const user = await User.findOne({ email: req.body.email });
    console.log(req.body, "forgot");
    if (!user) {
      return await res
        .status(404)
        .json({ message: "leider haben wir nicht dieseEmail gefunden" });  
    }
    const token = await jwt.sign({id:user._id }, process.env.SECRET, { expiresIn: "1h"});
    console.log(token, "token");





    const transporter = nodemailer.createTransport({
        service:'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: 'denemesolmaz24@gmail.com',
          pass: 'hphhjjxgtmlnqrps'
        }
      });
      
     const mailOptions = {
        from:{
            name:'web Dizayun',
            address:'denemesolmaz24@gmail.com'
        },
        to:['msolmaz83@gmail.com'],
        subject:'send email',
        text:'Hello world',
        html:'<h1>hello World</h1>'
     }

     const sendMail = async(transporter,mailOptions)=>{
        try{
            await transporter.sendMail(mailOptions)
            console.log('mail gitti mi sence')
        }
        catch(error){
               console.log(error)
        }
     }
   sendMail(transporter,mailOptions)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bir hata oluştu." })
    
  }
};



const resetPassword = async (req, res) => {};
const userDetail = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    user,
  });
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
  userDetail,
};

// const forgotPassword = async (req, res) => {
//     try {
//       const { email } = req.body;
//       const user = await User.findOne({ email });

//       if (!user) {
//         return res.status(404).json({ message: 'Üzgünüz, bu e-posta bulunamadı.' });
//       }

//       const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });

//       // Token'ı içeren bir sıfırlama e-postası gönderme
//       const mailOptions = {
//         from: 'your-email@gmail.com',
//         to: email,
//         subject: 'Şifre Sıfırlama',
//         text: `Şifrenizi sıfırlamak için aşağıdaki bağlantıyı kullanın: http://your-website.com/reset-password?token=${token}`,
//       };

//       await transporter.sendMail(mailOptions);

//       res.status(200).json({ message: 'Şifre sıfırlama e-postası gönderildi.' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Bir hata oluştu.' });
//     }
//   };

//   const resetPassword = async (req, res) => {
//     try {
//       const { token, newPassword } = req.body;

//       const decoded = jwt.verify(token, process.env.SECRET);
//       const user = await User.findById(decoded.userId);

//       if (!user) {
//         return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
//       }

//       const passwordHash = await bcrypt.hash(newPassword, 10);
//       user.password = passwordHash;
//       await user.save();

//       res.status(200).json({ message: 'Şifre başarıyla sıfırlandı.' });
//     } catch (error) {
//       console.error(error);
//       res.status(401).json({ message: 'Geçersiz veya süresi dolmuş token.' });
//     }
//   };

//   module.exports = {
//     register,
//     login,
//     forgotPassword,
//     resetPassword,
//     logout,
//     userDetail,
//   };
