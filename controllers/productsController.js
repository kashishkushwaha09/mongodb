const Product = require("../models/products");


exports.postAddProduct=(req,res,next)=>{
    const {title,price,description,imageUrl}=req.body;
    const product=new Product(title,price,description,imageUrl);
    product.save()
    .then(result=>{
        console.log("Product Created!");
        res.status(201).json({message:"Product created successfully !",Product:result});
    }).catch(err=>{
        console.log(err);
    })
}