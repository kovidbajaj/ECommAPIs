import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import {ApplicationError} from '../../error-handler/error-handler.js'

export default class CartItemsRepository{
    constructor(){
        this.collection="cartItems";
    }

    async add(productID,userID,quantity){
        try{
        const db=getDB();
        const collection=db.collection(this.collection);
        await collection.updateOne({productID:new ObjectId(productID),userID:new ObjectId(userID)},{$inc:{quantity:quantity}},{upsert:true})
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with the database",500);
        }
    }

    async get(userID){
        try{
        const db=getDB();
        const collection=db.collection(this.collection);
        return await collection.find({userID:new ObjectId(userID)}).toArray();
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with the database",500);
        }
    }

    
    async delete(userID,productID){
        try{
        const db=getDB();
        const collection=db.collection(this.collection);
         await collection.deleteOne({productID:new ObjectId(productID),userID:new ObjectId(userID)})
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with the database",500);
        }       
    }
}