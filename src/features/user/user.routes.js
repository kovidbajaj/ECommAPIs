import express from "express";
import UserController from "./user.controller.js";
import { validateData } from "../../middlewares/validateUser.middleware.js";

const userController=new UserController();

const userRouter=express.Router();

// localhost:3200/api/users
userRouter.post('/signup',validateData,userController.signup);
userRouter.post('/signin',userController.signin);

export default userRouter;