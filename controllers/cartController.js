const Product = require("../models/products");

exports.postCart=(req,res,next)=>{
    const prodId=req.body.productId;
    Product.fetchById(prodId).then(product=>{
        return req.user.addToCart(product)
        .then(result=>{
        console.log(result);
        res.status(200).json({message:"cart is updated",result})
    })
     .catch(err=>{
        console.log(err);
        res.status(500).json({message:"something went wrong"})
     })
    })
    
}