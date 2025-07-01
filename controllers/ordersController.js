const Order=require('../models/orders');
exports.postOrders=(req,res,next)=>{
     const userId=req.body.userId;
        Order.save(userId)
            .then(result=>{
            console.log(result);
            res.status(200).json({message:"Order is added !",result})
        })
         .catch(err=>{
            console.log(err);
            res.status(500).json({message:"something went wrong"})
         })
        
}
exports.getOrders=(req,res,next)=>{
     const userId=req.params.userId;
        Order.getOrders(userId)
            .then(orders=>{
            console.log(orders);
            res.status(200).json({message:"Orders fetched successfully !",orders})
        })
         .catch(err=>{
            console.log(err);
            res.status(500).json({message:"something went wrong"})
         })
        
}
