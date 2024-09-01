const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.join(__dirname,"../public/admin-assets/imgs/productImages"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); 
    }
});




module.exports = storage
