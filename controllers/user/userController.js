const User = require("../../models/userSchema");
const nodemailer = require("nodemailer");
const env = require("dotenv").config()

const pageNotFound = async (req,res) => {
    try {
        res.render('user/page_404')
    } catch (error) {
        res.redirect()
    }
}

const loadHomepage = async (req,res) => {
    try {
        return res.render('user/home')
    } catch (error) {
     console.log('home page not fount');
      res.status(500).send("server error")  
    }
}


const loadSignup = async (req,res) => {
    try {
        return res.render("user/signup")
    } catch (error) {
        console.log("home page not loading",error);
        res.status(500).send("server error")
        
    }
}


const loadShopping = async (req,res) => {
    try {
        return res.render("shop")
    } catch (error) {
        console.log("shopping page not loading",error);
        res.status(500).send("server error")
        
    }
}


function generateOtp() {
    return Math.floor(100000+Math.random()*900000).toString()
}

async function sendVerificationEmail(email,otp){
     try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:process.env.NODEMAILER_EMAIL,
                pass:process.env.NODEMAILER_PASSWORD
            },
            tls: { rejectUnauthorized: false }
        })
        
        const info = await transporter.sendMail({
            from:process.env.NODEMAILER_EMAIL,
            to: email,//email parameter
            subject:"verify your account",
            text:`Your OTP is ${otp}`,
            html:`<b> Your OTP ${otp} </b>`
        });

        return info.accepted.length >0

      } catch (error) {
            console.error('error sending email',error);
            return false;
            
      }
}


const signup = async (req,res) => {
   
    try {
        const {name,phone,email,password,cPassword} = req.body;
       
    //   const newUser = new User({name,email,phone,password}); //schema instance nte ullil schemayilekk datas okke same orderil koduthu ayachu
    //   await newUser.save();

      if(password!=cPassword){
        return res.render("user/signup",{message:"passwords do not match"});
      }

      const findUser = await User.findOne({email});

      if(findUser){
        return res.render("user/signup",{message:"User with this email already exists"});
      }
     
      const otp = generateOtp();

      const emailSend = await sendVerificationEmail(email,otp);

          if(!emailSend){
          return  res.json("email-error");
          }

          req.session.userOtp=otp;
          req.session.userData={email,password}


        //   res.render("verify-otp");
          console.log("OTP sent",otp);
          

    } catch (error) {
        console.error("signup error",error);
        res.redirect("/pageNotFound")
        
    }
}



module.exports = {
    loadHomepage,
    pageNotFound,
    loadShopping,
    loadSignup,
    signup,
}