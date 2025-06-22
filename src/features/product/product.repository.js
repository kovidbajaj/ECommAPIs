import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/error-handler.js";
import ProductModel from "./product.model.js";

export default class ProductRepository{
    constructor(){
        this.collection="products";
    }
     async add(name,desc,price,imageUrl,category,sizes){
        if(sizes){
            const newProduct=new ProductModel(name,desc,parseFloat(price),imageUrl,category,sizes.split(','));
            try{
            const db=getDB();
            const collection=db.collection(this.collection);
            await collection.insertOne(newProduct);
            return newProduct;
            }catch(err){
                console.log(err);
                throw new ApplicationError('Something went wrong with database',500);
            }
            
        }else{
            const newProduct=new ProductModel(name,desc,parseFloat(price),imageUrl,category);
            try{
            const db=getDB();
            const collection=db.collection(this.collection);
            await collection.insertOne(newProduct);
            return newProduct;
            }catch(err){
                console.log(err);
                throw new ApplicationError('Something went wrong with database',500);
            }
        }  
    }


     async  getAll(){
        try{
        const db=getDB();
        const collection=db.collection(this.collection);
        return await collection.find().toArray();
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database",500);
        }
    }


      async get(productID){
        try{
        const db=getDB();
        const collection=db.collection(this.collection);
        return  await collection.findOne({_id: new ObjectId(productID)})
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database",500);
        }
    }


      async filter(minPrice,maxPrice,category){
        try{
        const db=getDB();
        const collection=db.collection(this.collection);
        let filterExpression={};
        if(minPrice){
            filterExpression.price={$gte:parseFloat(minPrice)};
        }
        if(maxPrice){
            filterExpression.price={...filterExpression.price,$lte:parseFloat(maxPrice)}
        }
        if(category){
            filterExpression.category=category;
        }
        return await collection.find(filterExpression).toArray()
    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database",500);
    }  
    }


     async rate(userID,productID,rating){
        try{
        const db=getDB();
        const collection=db.collection(this.collection);
        // 1.Remove existing entry.
        await collection.updateOne({_id:new ObjectId(productID)},{$pull:{ratings:{userID:new ObjectId(userID)}}})

        // 2.Add new entry.
        await collection.updateOne({_id:new ObjectId(productID)},{$push:{ratings:{userID:new ObjectId(userID),rating:parseFloat(rating)}}})
    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database",500);
    }
}
}