// const {MongoClient} = require("mongodb");
// const {Schema, default: mongoose} = require("mongoose");
// const url = "mongodb://localhost:27017"

// const dbName = "orderfood"
// const client = new MongoClient(url);

// const mySchema = new Schema({
//     name : String,
//     quantity: Number,
//     price : Number,
// })


// const myModel = mongoose.model("myModel", mySchema, "inventory");


// client.connect( (err)=>{
//     if(err) {
//         console.log( err);
//     }
// });

// const db = client.db("orderfood");
// myModel.find({}, function( err, docs){
//     if( err){
//         console.log(err);
//         return;
//     }
//     console.log("All documents : ", docs);
// })

// async function connect(){
//     await client.connect();
    // const db = client.db( dbName);
    // const inventoryCollection = db.collection("inventory");
    // const insertResult = await inventoryCollection.insertMany([{name: "pizza"}, {name: "Fruit"}, {name: "launch"}]);
    // console.log( insertResult);
    // const findResult = await inventoryCollection.find({name: "pizza"}).toArray();
    // console.log( findResult);
    // return Promise.reject("asdfjkashdkfjahsdlfjh");
// }


// client.close();





const bcrypt = require("bcrypt");
const saltRound = 10;
const privateKey = "Tong Phuc";
const passwordPlainText = "this is your password"

bcrypt.genSalt( saltRound, function( err, salt){
    bcrypt.hash( passwordPlainText, salt, function(err, hash){
        console.log( hash);
        bcrypt.compare( privateKey, hash, (err, result)=>{
            if( result){
                console.log( result);
            }else{
                console.log( result);
            }
        })
    });
});

