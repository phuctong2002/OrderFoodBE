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

const addDish = async ( req, res, next)=>{
  // console.log(req.file);
  // console.log( req.body);
  const {name, description, category, price} = req.body;
  const path = req.file.path;
  const db = client.db("orderfood");
  const collection = db.collection("dish");
  const resultInsert = await collection.insertOne({
    name: name,
    category: category,
    price: parseInt(price),
    calories: 12,
    disc : description,
    path: path,
  });
  console.log( resultInsert)
  if( resultInsert){
    return res.status(201).json({
      msg: "Them thanh cong"
    })
  }
  return res.status(500).json({
    msg: "Them that bai roi nhe"
  })
  
}

module.exports = { getAllCategories, getDish, getDetailDish, addDish };