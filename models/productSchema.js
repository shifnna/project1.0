const mongoose=require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema({
    productName:{
       type:String,
       required:true,
    },
    discription:{
        type:String,
        required:true,
    },
    category:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Category"
    },
    brand:{
        type:String,
        required:true,
    },
    regularPrice:{
        type:Number,
       required:true,
    },
    salePrice:{
        type:Number,
       required:true,
    },
    productOffer:{
        type:Number,
        default:0,
    },
    quantity:{
        type:Number,
        default:0,
    },
    color:{
        type:String,
        required:true,
    },
    productImage:{
        type:[String],
        required:true,
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    status:{
        type:String,
        enum:["Available","out of stock","discontinued"],
        required:true,
        default:'Available'
    },
  
},{timestamps:true});


module.exports = mongoose.model("Product",productSchema);