const jwt = require("jsonwebtoken");

const checkToken = ( req, res, next)=>{
    const {token} = req.body;
    try{
        var decoded = jwt.verify( token, process.env.PRIVATE_KEY);
        return res.status(200).json({
            isValid: true,
        })
    }catch(err){
        return res.status(403).json({
            isValid: false
        })
    }
}
