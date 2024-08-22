const User = require("../../models/userSchema");
const nodemailer = require("nodemailer");
const env = require("dotenv").config();
const bcrypt = require('bcrypt');

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
       
    //   const newUser = new User({name,email,phone,password,cPassword}); //schema instance nte ullil schemayilekk datas okke same orderil koduthu ayachu
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
          req.session.userData={name,phone,email,cPassword}


          res.render("user/verify-otp");
          console.log("OTP sent",otp);
          

    } catch (error) {
        console.error("signup error",error);
        res.redirect("/pageNotFound")
        
    }
}




const securePassword = async (password)=>{
         try {
            const passwordHash = await bcrypt.hash(password, 10);
            return passwordHash;
         } catch (error) {
            
         }
}

const verifyOtp = async (req,res)=>{
    try {
        const {otp} = req.body;
        console.log(otp);

        if(otp===req.session.userOtp){
            const user = req.session.userData;
            const passwordHash = await securePassword(user.cPassword);
            const saveUserData = new User({
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: passwordHash,
            })
            await saveUserData.save();
            req.session.user = saveUserData. _id,
            res.json({success:true,redirectUrl:"/"});
        }else{
            res.status(400).json({success:false , message:"invalid OTP, please try again"});
          
        }
        
    } catch (error) {
        console.error("error verifying otp",error);
        res.status(500).json({success:false,message:"an error occure"})
            
    }
}






const resendOtp = async (req,res)=>{
           try {
            const {email}= req.session.userData;

            if(!email){
               return res.status(400).json({success:false,message:"Email not found in session"})
            }
           
        const otp = generateOtp();
        req.session.userOtp = otp;

        const emailSent = await sendVerificationEmail(email,otp);
        if(emailSent){
            console.log("resend OTP:",otp);
            res.status(200).json({success:true,message:'OTP Resend successful'});
        }else{
            res.status(500).json({success:false,message:'Failed to ResendOTP, please try again..'})
        }

           } catch (error) {
            console.error("Failed to Resend OTP",error);
            res.status(500).json({success:false,message:'internal Server Error, please try again'})
            
           }
}





module.exports = {
    loadHomepage,
    pageNotFound,
    loadShopping,
    loadSignup,
    signup,
    verifyOtp,
    resendOtp,
}