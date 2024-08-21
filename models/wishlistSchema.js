const mongoose=require("mongoose");
const {Schema} = mongoose;

const wishlistSchema = new Schema({
    userId:{
       type:Schema.Types.ObjectId,
       required:true,
       ref:"User"
    },
    products:[{
        productId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:"Product",
        },
        addedOn:{
           type:Date,
           default:Date.now
        }
    }],
});


module.exports = mongoose.model("Wishlist",wishlistSchema);