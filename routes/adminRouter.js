const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin/adminController");


router.get("/login",adminController.loadLoagin);


module.exports = router;