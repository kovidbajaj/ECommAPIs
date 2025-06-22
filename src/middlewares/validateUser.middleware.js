import { body,validationResult } from "express-validator";

export const validateData=async (req,res,next)=>{
    // 1. Set up rules for validation
    const rules=[
        body('name').notEmpty().withMessage('Name is Required'),
        body('email').isEmail().withMessage("Enter a valid Email"),
        body('password').isStrongPassword().withMessage('Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol'),
        body('type').isIn(["Seller","User"]).withMessage("Type should be seller or user"),   
    ];

    // 2.Run these rules
    await Promise.all(rules.map((rule)=>rule.run(req)));

    // 3.Check if there are any errors.
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).send(errors.array()[0].msg);
    }else{
        next();
    }
}
