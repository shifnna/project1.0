const mongoose=require("mongoose");
const {Schema} = mongoose;

const categorySchema = new Schema({
    name:{
       type:String,
       required:true,
       unique:true
    },
    description:{
        type:String,
        required:true,
    },
    categoryOffer:{
        type:Number,
       default:0,
    },
    isListed:{
        type:Boolean,
        default:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
  
},{timestamps:true});


module.exports = mongoose.model("Category",categorySchema);