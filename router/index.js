const express = require("express");
const router = express.Router();
const userRouter = require("./user/index");
const productRouter = require("./product/index");
const orderRouter = require("./order/index");
router.use("/user", userRouter)
router.use("/product", productRouter);
router.use("/order", orderRouter)
module.exports = router;
