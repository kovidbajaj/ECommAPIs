import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "./user.model.js";
import UserRepository from "./user.repository.js";

//Create an instance of User Repository Class.
const userRepository=new UserRepository();

export default class UserController{
    async signup(req,res){
        const{name,email,password,type}=req.body;
        const hashedPassword=await bcrypt.hash(password,12); //Hashing the password.
        const user=new UserModel(name,email,hashedPassword,type); //Creating a document.
        await userRepository.signUp(user);
        res.status(201).send("Registration Successful");
    }

    async signin(req,res){
        const{email,password}=req.body;
        // 1.Find the user by email.
        const user=await userRepository.findByEmail(email);
        if(!user){
            return res.status(400).send("Incorrect credentials");
        }else{
            // 2.Compare the password with hashed Password
            const result=await bcrypt.compare(password,user.password);
            if(result){
                //3.Create Token.
                const token=jwt.sign({
                userID:user._id,
                userName:user.name,
                userEmail:user.email,
                userType:user.type,
            },process.env.JWT_SECRET,{expiresIn:'1h'}); 

            // 4.Send the token.
            return res.status(200).send(token);
            }else{
                return res.status(400).send("Incorrect Credentials");
            }
        }
}
}