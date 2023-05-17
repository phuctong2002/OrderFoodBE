const express = require('express');
const { login, register,getAllInfo, updateInfo } = require('../../controller/user');
const router = express.Router();


router.route("/").get(getAllInfo).put(updateInfo)
router.route("/login").post( login)
router.route("/register").post(register);
module.exports = router;