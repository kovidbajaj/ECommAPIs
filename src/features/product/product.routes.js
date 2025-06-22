import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/file-upload.middleware.js";

const productController=new ProductController();
const productRouter=express.Router();

// localhost:3200/api/products
productRouter.get('/filter',productController.filterProducts);
productRouter.post('/rate',productController.rateProduct);
productRouter.get('/',productController.getAllProducts);
productRouter.post('/',upload.single('imageUrl'),productController.addProduct);
productRouter.get('/:id',productController.getOneProduct);

export  default productRouter;