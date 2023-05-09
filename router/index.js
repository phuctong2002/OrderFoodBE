const express = require("express");
const router = express.Router();
const userRouter = require("./user/index");
const productRouter = require("./product/index");
router.use("/user", userRouter)
router.use("/product", productRouter);

module.exports = router;
