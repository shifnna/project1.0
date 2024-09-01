// const mongoose=require("mongoose");
// const {Schema} = mongoose;

// const productSchema = new Schema({
//     productName:{
//        type:String,
//        required:true,
//     },
//     discription:{
//         type:String,
//         required:true,
//     },
//     category:{
//         type:Schema.Types.ObjectId,
//         required:true,
//         ref:"Category"
//     },
//     brand:{
//         type:String,
//         required:true,
//     },
//     regularPrice:{
//         type:Number,
//        required:true,
//     },
//     salePrice:{
//         type:Number,
//        required:true,
//     },
//     productOffer:{
//         type:Number,
//         default:0,
//     },
//     quantity:{
//         type:Number,
//         default:0,
//     },
//     color:{
//         type:String,
//         required:true,
//     },
//     productImage:{
//         type:[String],
//         required:true,
//     },
//     isBlocked:{
//         type:Boolean,
//         default:false,
//     },
//     status:{
//         type:String,
//         enum:["Available","out of stock","discontinued"],
//         required:true,
//         default:'Available'
//     },
  
// },{timestamps:true});


// module.exports = mongoose.model("Product",productSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: { type: String, required: true },
    description: { type: String, required: true }, // Ensure this matches your code
    brand: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    regularPrice: { type: Number, required: true },
    salePrice: { type: Number },
    createdOn: { type: Date, default: Date.now },
    quantity: { type: Number, required: true },
    color: { type: String },
    size: { type: String },
    productImage: [{ type: String }],
    status: { type: String, default: 'Available' },
});

module.exports = mongoose.model('Product', productSchema);
