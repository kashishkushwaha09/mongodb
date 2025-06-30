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

exports.getProducts=(req,res,next)=>{
  
    Product.fetchAll()
    .then(products=>{
     res.status(200).json({message:"Products fetched successfully !",products});
    })
    .catch(err=>{
        console.log(err);
    })
}
exports.getProductId=(req,res,next)=>{
    Product.fetchById(req.params.id)
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
    const product=new Product(title,price,description,imageUrl,productId);
    product.save()
    .then(product=>{
        console.log("Product Updated!");
        res.status(200).json({message:"Product updated successfully !",product});
    }).catch(err=>{
        console.log(err);
    })
    
}
exports.deleteProduct=(req,res,next)=>{
    Product.deleteById(req.params.id)
    .then(product=>{
        console.log("Product deleted !");
        res.status(200).json({message:"Product deleted successfully !",product});
    }).catch(err=>{
        console.log(err);
    })
}