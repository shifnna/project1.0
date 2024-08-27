const User = require("../../models/userSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const loadLoagin =  (req,res)=>{
    if(req.session.admin){
        return res.redirect("/admin/dashboard")
    }
    res.render("admin-login",{message:null})
}


module.exports = {
    loadLoagin,
}