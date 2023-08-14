const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { client} = require("./../../db/connect.js");
const login = async( req, res, next)=>{
    const {email, password} = req.body;
    const db = client.db("orderfood");
    const collection = db.collection("user");
    const document = await collection.findOne({email: email});
    console.log( document.isAdmin);
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
                isAdmin: document.isAdmin,
                token: token,
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


const getAllInfo = (req, res, next)=>{
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    console.log( token );
    try{
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        console.log(decoded.email);
        return res.status(200).json({
            msg: "token hop le",
            data: {
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                phone: decoded.phone,
                email: decoded.email,
                address: decoded.address,
            }
        })
    }catch(error){
        console.log("token sai hoac het han roi nhe anh em");
        return res.status(400).json({
            msg: "Lay thong tin nguoi dung su dung token"
        })
    }
}


const updateInfo = async(req, res, next)=>{
    console.log( req.body);
    const {oldEmail, firstName, lastName, phone, email, address} = req.body;
    const db = client.db("orderfood");
    const collection = db.collection("user");
    const updateResult = await collection.updateOne({email: oldEmail}, {$set:{firstName: firstName, lastName: lastName, phone: phone, email: email, address: address}});
    if( updateResult.matchedCount == 1 ){
        console.log("update thanh cong neh");
         
        const result = await collection.findOne({"email": email});  
        const {nfirstName, nlastName, nphone, nemail, naddress} = result;
        return res.status(200).json({
            msg: "update thanh cong nhe",
            info: {
                "firstName": nfirstName,
                "lastName": nlastName, 
                "phone": nphone, 
                "email" : email, 
                "address": address
            },
        })
    }else{
        return res.status(422).json({
            msg: "update khong thanh cong neh"
        })
    }
    
}

module.exports=  {login, register, getAllInfo, updateInfo};