import express from "express";
import CartItemsController from "./cartItems.controller.js";

const cartItemsController=new CartItemsController(); 

const cartRouter=express.Router();

// localhost:3200/api/cartItems/
cartRouter.post('/',cartItemsController.add);
cartRouter.get('/',cartItemsController.get);
cartRouter.delete('/:productID',cartItemsController.delete);


export default cartRouter;