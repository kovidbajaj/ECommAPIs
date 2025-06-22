import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/error-handler.js";

export default class UserRepository{
    constructor(){
        this.collection="users";
    }
     async signUp(newUser){
        try{
        // 1.Get the DB.
        const db=getDB();

        // 2.Get the collection.
        const collection=db.collection(this.collection);

        // 3.Insert a new document inside the collection.
        await collection.insertOne(newUser);
        }catch(err){
            throw new ApplicationError('Something went wrong with database',500);
        }
    }
    
     async findByEmail(email){
        try{
        // 1.Get the database.
        const db=getDB();

        //2. Get the collection.
        const collection=db.collection(this.collection);

        // 3. Get the document. 
        return await collection.findOne({email});
    }catch(err){
        throw new ApplicationError("Something went wrong with Database",500);
    }
}

 async getAll(){
        try{
        // 1.Get the DB.
        const db=getDB();

        // 2.Get the collection.
        const collection=db.collection(this.collection);

        // 3.Get all the documents.
        const result=await collection.find().toArray();
        return result;
        }catch(err){
            throw new ApplicationError("Something went wrong with database",500);
        }
    }
}