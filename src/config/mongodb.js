import { MongoClient } from "mongodb";

//const url="mongodb://localhost:27017/ecomdb";

let client;
export const connectToMongoDB=()=>{
    MongoClient.connect(process.env.DB_URL)
     .then(clientInstance=>{
        client=clientInstance; //Using this client instance we can access a particular database.
        console.log("MongoDB is connected.");
     })
     .catch(err=>{
        console.log(err)
     })
}

export const getDB=()=>{
    return client.db();
}