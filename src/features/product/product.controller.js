import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

//Create an instance of Product Repository Class.
const productRepository=new ProductRepository();

export default class ProductController{

    async getAllProducts(req,res){
        const products=await productRepository.getAll();
        res.status(200).send(products);
    }

    async addProduct(req,res){
        const{name,desc,price,category,sizes}=req.body;
        const imageUrl="uploads/"+req.file.filename;
        const createdRecord=await productRepository.add(name,desc,price,imageUrl,category,sizes);
        res.status(201).send(createdRecord);
    }

    async getOneProduct(req,res){
        const productID=req.params.id;
        const product=await productRepository.get(productID);
        if(!product){
            return res.status(404).send('Product Not Found');
        }else{
            return res.status(200).send(product);
        }
    }

    async filterProducts(req,res){
        const minPrice=req.query.minPrice;
        const maxPrice=req.query.maxPrice;
        const category=req.query.category;
        const result=await productRepository.filter(minPrice,maxPrice,category);
       return  res.status(200).send(result);
    }

    async rateProduct(req,res){
        const userID=req.userID;
        const productID=req.query.productID;
        const rating=req.query.rating;
        const product=productRepository.get(productID);
        if(!product){
            return res.status(400).send('Product not found');
        }
        if(rating>5 || rating<0){
            return res.status(400).send('Invalid Rating');
        }
        await productRepository.rate(userID,productID,rating);
        res.status(200).send("Product Rated");
    }
};