const Product = require("../models/products");


exports.postAddProduct=(req,res,next)=>{
    console.log(req.body);
    const title=req.body.title;
    const price=req.body.price;
    const description=req.body.description;
    const imageUrl=req.body.imageUrl;
    const product=new Product({
        title,price,description,imageUrl,userId:req.user._id
    });
    product.save()
    .then(result=>{
        console.log("Product Created!");
        res.status(201).json({message:"Product created successfully !",Product:result});
    }).catch(err=>{
        console.log(err);
    })
}

exports.getProducts=(req,res,next)=>{
  Product.find().populate('userId','name')
  .then(products => {
    console.log("All Products:", products);
     res.status(200).json({message:"Products fetched successfully !",products});
  })
  .catch(err => {
    console.error("Error fetching products:", err);
  });
   
}
exports.getProductId=(req,res,next)=>{
    Product.findById(req.params.id)
    .then(product=>{
     res.status(200).json({message:"Product fetched successfully !",product});
    })
    .catch(err=>{
        console.log(err);
    })
}
exports.updateProduct=(req,res,next)=>{
    const {productId,title,price,description,imageUrl}=req.body;
    console.log(req.body)
    Product.findById(productId).then(product=>{
        product.title=title;
        product.price=price;
        product.description=description;
        product.imageUrl=imageUrl;
        return product.save();
    })
    .then(product=>{
        console.log("Product Updated!");
        res.status(200).json({message:"Product updated successfully !",product});
    }).catch(err=>{
        console.log(err);
    })
    
}
exports.deleteProduct=(req,res,next)=>{
    Product.deleteOne({_id:req.params.id})
    .then(product=>{
        console.log("Product deleted !");
        res.status(200).json({message:"Product deleted successfully !",product});
    }).catch(err=>{
        console.log(err);
    })
}