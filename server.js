// Modules
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import swagger from "swagger-ui-express";
import fs from "fs";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cart/cartItems.routes.js";
import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { log } from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/error-handler.js";
import { connectToMongoDB } from "./src/config/mongodb.js";
const apiDocs=JSON.parse(fs.readFileSync('swagger.json',{encoding:'utf-8'}));
//import apiDocs from './swagger.json' assert{type:'json'};

// Creating Server using Express.
const server=express();

// Swagger configuration.
server.use('/api-docs',swagger.serve,swagger.setup(apiDocs));

//CORS policy configuration.
server.use(cors());

// Make Public folder directly accessible.
server.use(express.static('./public'));

// Parsing the data coming from Request Body.
server.use(express.urlencoded({extended:true}));
server.use(express.json());

// Request Logging.
server.use(loggerMiddleware);

// Routes
server.use('/api/products',jwtAuth,productRouter);
server.use('/api/users',userRouter);
server.use('/api/cartItems',jwtAuth,cartRouter);

// Handle Default Request.
server.get('/',(req,res)=>{
    res.send("Welcome to E-Comm APIs");
});

// Error Handler
server.use(async (err,req,res,next)=>{
    await log(err);
    //User Defined Errors.
    if(err instanceof ApplicationError){
        return res.status(err.code).send(err.message);
    }
    //Server Errors.
    return res.status(500).send('Something went wrong,please try again later');
})

//Handling 404.
server.use((req,res)=>{
    res.status(404).send("API not found");
});

// Specify a port number to the server.
server.listen(3200,()=>{
    console.log("Server is running at 3200");
    connectToMongoDB(); 
})
