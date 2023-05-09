const express = require("express");
const jwt = require("jsonwebtoken");
const { getAllCategories, getDish,getDetailDish } = require("../../controller/product");
const router = express.Router();


router.route("/").post(( req, res, next)=>{
    const token = req.body.token;
    console.log( token);
    try{
        var decoded = jwt.verify( token, process.env.PRIVATE_KEY)
        // kiem tra cho chac keo phai khong nao
        const now = Math.floor( Date.now()/1000);
        if( now > decoded.exp){
            console.log( "expired token");
        }else{
            console.log("valid token");
        }
    }catch(err){
        console.log("token sai hoac het han nhe anh em ");
    }


    return res.status(200).json({
        msg: "test token"
    })
})


router.route("/category").get( getAllCategories);
router.route("/category/:category").get( getDish);
router.route("/dish/:dishId").get(getDetailDish);
module.exports = router;