const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin/adminController");
const {userAuth,adminAuth} = require("../middlewares/auth");
const customerController = require("../controllers/admin/customerController");
const productController = require("../controllers/admin/productController");
const categoryController = require("../controllers/admin/categoryController")
const multer = require("multer");
const storage = require("../helpers/multer");
const uploads = multer({storage:storage});
const brandController = require("../controllers/admin/brandController")



router.get("/pageerror",adminController.pageerror);
//login management
router.get("/login",adminController.loadLogin);
router.post("/login",adminController.login);
router.get("/",adminAuth,adminController.loadDashboard);
router.get("/logout",adminController.logout);
//customer management
router.get("/users",adminAuth,customerController.customerInfo);
router.get("/blockCustomer",adminAuth,customerController.customerBlocked);
router.get("/unblockCustomer",adminAuth,customerController.customerunBlocked);
//category management
router.get("/category",adminAuth,categoryController.categoryInfo);
router.post("/addCategory",adminAuth,categoryController.addCategory);
router.post("/addCategoryOffer",adminAuth,categoryController.addCategoryOffer);
router.post("/removeCategoryOffer",adminAuth,categoryController.removeCategoryOffer);
router.get("/listCategory",adminAuth,categoryController.getListCategory);
router.get("/unlistCategory",adminAuth,categoryController.getUnlistCategory);
router.get("/editCategory",adminAuth,categoryController.getEditCategory);
router.post("/editCategory/:id",adminAuth,categoryController.editCategory);
//Brand managemnet
router.get("/brands",adminAuth,brandController.getBrandPage);
router.post("/addBrand",adminAuth,uploads.single("image"),brandController.addBrand);
router.get("/blockBrand",adminAuth,brandController.blockBrand);
router.get("/unBlockBrand",adminAuth,brandController.unBlockBrand);
router.get("/deleteBrand",adminAuth,brandController.deleteBrand);
//product management
router.get("/addProducts",adminAuth,productController.getProductAddPage)
router.post("/addProducts",adminAuth,uploads.array('images',4),productController.addProducts);
router.get("/products",adminAuth,productController.getAllProducts);
router.post("/removeProductOffer",adminAuth,productController.removeProductOffer)
router.post("/addProductOffer",adminAuth,productController.addProductOffer)

















module.exports = router;