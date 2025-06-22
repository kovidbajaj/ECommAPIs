import jwt from "jsonwebtoken";

const jwtAuth=(req,res,next)=>{
    // 1. Read the token
    const token=req.headers["authorization"];
    if(!token){
        return res.status(401).send("Unauthorized");
    }
    // 2. Check if token is valid or not
    try{
    const payload=jwt.verify(token,process.env.JWT_SECRET);
    req.userID=payload.userID;
    }catch(err){
        return res.status(401).send("Unauthorized");
    }
    next();
}
export default jwtAuth;