const express = require('express');
const path = require("path");
const session = require("express-session")
const dotenv = require('dotenv');
dotenv.config();
const userRouter = require("./routes/userRouter")
const db = require('./config/db');
db();

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:false,
        httpOnly:true,
        maxAge:72*60*60*1000 //72hrs
    }
}))
app.use((req,res,next)=>{
    res.set('cache-control','no-store');
    next();
});


app.set("view engine","ejs");
app.set('views', './views');    
app.use(express.static(path.join(__dirname,"public")));


app.use("/",userRouter)


const port = process.env.PORT||3001
app.listen(port, (err) => {
    if (err) {
        console.error('Failed to start server:', err);
    } else {
        console.log(`Server running on port ${process.env.PORT}`);
    }
});

module.exports = app;
