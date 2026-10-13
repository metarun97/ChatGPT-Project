const express = require("express");
const authController = require("../controllers/auth.controller");


/* Router created */
const router = express.Router();


/* Route - /api/auth/register */
router.post("/register", authController.registerUser);


/* Route - /api/auth/login */
router.post("/login", authController.loginUser);



module.exports = router;





