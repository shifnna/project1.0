const mongoose=require("mongoose");
const {Schema} = mongoose;
const {v4:uuidv4} = require("uuid");


const orderSchema = new Schema({
    orderId:{
       type:String,
       default:()=>uuidv4(),//endhayalum object id display cheyan paadilla evideyum and oru order id random aayitt kittanam invoice il, oder details il okke kodukkan so that why we using the uuid module just for display something on invoice and somenthing else...
       unique:true
    },
    orderedItems:[{
        product:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:"Product",
        },
        quantity:{
           type:Number,
           required:true,
        },
        price:{
            type:Number,
            default:0,
        }
    }],
    totalPrice:{
        type:Number,
        required:true,
    },
    discount:{
        type:Number,
        default:0,
    },
    finalAmount:{
        type:Number,
        required:true,
    },
    address:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    invoiceDate:{
        type:Date,
    },
    status:{
        type:String,
        required:true,
        enum:['Pending','Processing','Shipped','Delivered','Cancelled','Return Request','Return'],
    },
    createdOn:{
        type:Date,
        default:Date.now,
        required:true,
    },
    couponApplied:{
        type:Boolean,
        default:false,
    }
});


module.exports = mongoose.model("Order",orderSchema);