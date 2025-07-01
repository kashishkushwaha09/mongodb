const Product = require("../models/products");

exports.postCart=(req,res,next)=>{
    const prodId=req.body.productId;
    Product.findById(prodId).then(product=>{
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
exports.getCart=async(req,res,next)=>{
  req.user.populate('cart.items.productId')
  .then(user => {
    res.status(200).json({
      message: "Cart is fetched",
      cart: user.cart.items
    });
  })
  .catch(err => {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Something went wrong" });
  });
    
}
exports.deleteCart=(req,res,next)=>{
     req.user.deleteCart(req.body.productId)
    .then(result=>{
     res.status(200).json({message:"Cart deleted successfully !",result});
    })
    .catch(err=>{
        console.log(err);
    })
}