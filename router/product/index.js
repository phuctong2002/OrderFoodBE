const express = require("express");
const jwt = require("jsonwebtoken");

const multer = require("multer");

const {
  getAllCategories,
  getDish,
  getDetailDish,
  addDish,
} = require("../../controller/product");
const router = express.Router();

// Define storage configuration for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the upload directory
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Set the file name to be the original file name with a timestamp
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create an instance of the multer middleware with the storage configuration
const upload = multer({ storage: storage });

router.route("/").post((req, res, next) => {
  const token = req.body.token;
  console.log(token);
  try {
    var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    // kiem tra cho chac keo phai khong nao
    const now = Math.floor(Date.now() / 1000);
    if (now > decoded.exp) {
      console.log("expired token");
    } else {
      console.log("valid token");
    }
  } catch (err) {
    console.log("token sai hoac het han nhe anh em ");
  }

  return res.status(200).json({
    msg: "test token",
  });
});






router.route("/category").get(getAllCategories);
router.route("/category/:category").get(getDish);
router.route("/dish/:dishId").get(getDetailDish);
router.route("/upload-dish").post(upload.single("image"), addDish);
module.exports = router;
