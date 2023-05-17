const jwt = require("jsonwebtoken");

const auth = ( req,res, next)=>{
    const authHeader = req.headers["authorization"];
    const token = auth&& authHeader.split(" ")[1];
    try{
        const decoded = jwt.decode(token, process.env.PRIVATE_KEY);
        next();
    }catch(err){
        console.log("Token sai hoac het han");
        return res.status(403).json({
            isValid: false,
        })
    }
}


module.exports = auth;