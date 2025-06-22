import ProductModel from "../product/product.model.js";
import CartItemsRepository from "./cart.repository.js";
import CartItemsModel from "./cartItems.model.js";
import ProductRepository from "../product/product.repository.js"

//Create an instance of CartItemsRepository class
const cartItemsRepository=new CartItemsRepository();

//Create an instance of ProductRepository class
const productRepository=new ProductRepository();

export default class CartItemsController{
    async add(req,res){
        //Add item to the cart
        const {productID,quantity}=req.body;
        const userID=req.userID; 
        await cartItemsRepository.add(productID,userID,parseFloat(quantity));
        return res.status(200).send('Item added to the cart');
    }

    async get(req,res){
        //Get all the items from the cart
        const userID=req.userID;
        const cartItems=await cartItemsRepository.get(userID);
        res.status(200).send(cartItems);
    }

    async delete(req,res){
        //Delete item from the cart
        const userID=req.userID;
        const productID=req.params.productID;
        const product=await productRepository.get(productID);
        if(!product){
            return res.status(404).send("Product Not Found");
        }
        await cartItemsRepository.delete(userID,productID);
        const cartItems=await cartItemsRepository.get(userID);
        res.status(200).send(cartItems);
    }
}