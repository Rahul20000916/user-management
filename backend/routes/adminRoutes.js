const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");



//LOGIN PAGE
router.post("/admin-login", adminController.doAdminLogin);

//GET USERS
router.post("/user", adminController.getUsers);

//ADD USER
router.post("/add-user", adminController.addUser);

//EDIT USER
router.post("/edit-user",adminController.editUser);

//UPDATE USER
router.post("/update-user",adminController.updateUser);

//DELETE USER
router.delete("/delete-user",adminController.deleteUser);

//BLOCK USER
router.delete("/block-user",adminController.blockUser);

module.exports = router;  