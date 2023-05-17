const express = require("express");
const { orderFood, getOrder, updateOrder } = require("../../controller/order");


const router = express.Router();
router.route("/").post( orderFood).get( getOrder).put(updateOrder);

module.exports = router;