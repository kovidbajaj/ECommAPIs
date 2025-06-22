import UserModel from "../features/user/user.model.js";

const basicAuthorizer=(req,res,next)=>{
    // 1. Check if authorization header is empty
    const authHeader=req.headers["authorization"];
    if(!authHeader){
        return res.status(401).send("Unauthorized Access");
    }
    console.log(authHeader); //Basic qwerty...

    // 2. Extract the credentials
    const base64Credentials=authHeader.replace('Basic ','');
    console.log(base64Credentials); //qwerty...

    // 3. Decode the extracted credentials
    const decodedCreds=Buffer.from(base64Credentials,'base64').toString('utf-8');
    console.log(decodedCreds);// <username>:<password>
    const creds=decodedCreds.split(':');
    const user=UserModel.getAll().find((u)=>u.email==creds[0] && u.password==creds[1]);

    if(user){
        next();
    }else{
        return res.status(401).send("Incorrect Credentials");
    }
}
export default basicAuthorizer;