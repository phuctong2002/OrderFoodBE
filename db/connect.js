const {MongoClient} = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "orderfood";
const client = new MongoClient( url);

async function connect(){
    await client.connect();
    const db = client.db(dbName);    
}


module.exports = {connect, client};