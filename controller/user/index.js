const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { client} = require("./../../db/connect.js");
const login = async( req, res, next)=>{
    const {email, password} = req.body;
    const db = client.db("orderfood");
    const collection = db.collection("user");
    const document = await collection.findOne({email: email});
    console.log( document);
    if( document){
        const match = await bcrypt.compare( password, document.hashPassword)
        if( match){
            const token = jwt.sign( {
                firstName: document.firstName,
                lastName: document.lastName,
                phone: document.phone,
                email: document.email,
            }, process.env.PRIVATE_KEY, {expiresIn: 60*60});
            return res.status(200).json({
                msg:"Dang nhap thanh cong",
                firstName: document.firstName,
                lastName: document.lastName,
                phone: document.phone,
                email: document.email,
                token,
            })
        }else{
            return res.status(404).json({
                msg: "Incorrect password",
            })
        }
    }else{
        return res.status(404).json({
            meg: "Tai khoan khong co trong he thong"
        })
    }
}

const register = ( req, res, next)=>{
    const {firstName, lastName, email, phone, password} = req.body;
    console.log(firstName, lastName, email, phone, password);
    const salt = bcrypt.genSaltSync( Number(process.env.SALT_ROUND ));
    const hashPassword = bcrypt.hashSync( password, salt);
    console.log( hashPassword);
    const insert =  async ()=>{
        const db = client.db("orderfood");
        const collection = db.collection("user");
        const document = await collection.findOne({email: email})
        if( document){
            return res.status(400).json({
                mes: "Tai khoan ton tai trong he thong"
            })
        }else{
            const resultInsert = await collection.insertOne({firstName, lastName, phone, email, hashPassword});
            if( resultInsert){
                const token = jwt.sign( {
                    firstName,
                    lastName,
                    email,
                    phone,
                }, process.env.PRIVATE_KEY, {expiresIn: 60*60});
                return res.status( 201).json({
                    mes: "created successfully",
                    firstName,
                    lastName,
                    email,
                    phone,
                    token
                })
            }else{
                return res.status(400 ).json({
                    mes: "error please try again",
                })
            }
            
        }
    }
    insert();
}


module.exports=  {login, register};