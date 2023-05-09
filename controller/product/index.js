const { ObjectId } = require("mongodb");
const { client } = require("../../db/connect.js");

const getAllCategories = async (req, res, next) => {
  // const token = req.headers.authorization.split(" ")[1];
  // console.log( token);
  // verify token nhe anh em
  const db = client.db("orderfood");
  const collection = db.collection("category");
  const document = await collection.find().toArray();
  console.log(document[0]);
  return res.status(200).json({
    msg: "sucessfully get all categories",
    data: document,
  });
};

const getDish = async(req, res, next)=>{
    console.log( req.params);
    const db = client.db("orderfood");
    const collection = db.collection("dish");
    const documents = await collection.find({category:req.params.category}).toArray();
    return res.status(200).json({
        msg: "get succesfully",
        data: documents
    })
}

const getDetailDish = async( req, res, next)=>{
    console.log( req.params.dishId);
    const db = client.db("orderfood");
    const collection = db.collection("dish");
    const document = await collection.findOne({_id: ObjectId(req.params.dishId) });
    return res.status(200).json(document)
}
module.exports = { getAllCategories, getDish, getDetailDish };
