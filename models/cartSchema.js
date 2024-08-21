const mongoose=require("mongoose");
const {Schema} = mongoose;

const cartSchema = new Schema({
    userId:{
       type:Schema.Types.ObjectId,
       required:true,
       ref:"User"
    },
    items:[{
        productId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:"Product",
        },
        quantity:{
           type:Number,
           default:1,
        },
        price:{
            type:Number,
           required:true,
         },
         totalPrice:{
            type:Number,
           required:true,
         },
         status:{
            type:String,
            default:"placed"
         },
         cancellationReason:{
            type:String,
            default:"none"
         }
    },]
});


module.exports = mongoose.model("Cart",cartSchema);