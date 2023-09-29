const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController")

// SIGNUP PAGE
router.post("/signup", userController.doSignup);

//LOGIN PAGE
router.post("/login", userController.doLogin);

//PROFILE PAGE
router.post("/",userController.getProfile);

//EDIT PAGE
router.post("/edit", userController.getEdit);

//UPDATE PROFILE
router.post("/update",userController.updateProfile);

//REMOVE USER
router.delete("/delete", userController.removeAccount);


module.exports = router;  