const { ObjectId } = require("mongodb");
const {client } = require("../../db/connect.js")

const orderFood = async( req, res, next)=>{
    const info = req.body;
    console.log( info);
    const data = {
        ...info,
        accept: false,
    }
    const db = client.db("orderfood");
    const collection = db.collection("order");
    const resultInsert = await collection.insertOne(data);
    if( resultInsert.acknowledged === true){
        return res.status(201).json({
            success: true
        })
    }else{
        return res.status(500).json({
            msg: "error"
        })
    }
}
const getOrder = async(req, res, next)=>{
    const db = client.db("orderfood");
    const collection = db.collection("order");
    const result = await collection.find({accept: false}).toArray();
    console.log(result);

    return res.status(200).json({
        msg: "get successfully",
        data: result
    })
}

const updateOrder = async( req, res, next)=>{
    console.log(req.body);
    const {accept, _id} = req.body;
    const db = client.db("orderfood");
    const collection = db.collection("order");
    const result = await collection.updateOne({_id: ObjectId(_id)},{$set:{accept: true}});
    if(result.matchedCount === 1){
        console.log( result);
        return res.status(200).json({
            msg: "update successfully",
        })
    }else{
        return res.status(500).json({
            msg: "some error occurred"
        })
    }
}


module.exports = {orderFood, getOrder, updateOrder};