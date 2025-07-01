const User=require('../models/users');
module.exports=(req,res,next)=>{
    console.log("req.body ",req.body)
    const userId=req.body.userId || req.query.userId;
 User.findById(userId)
 .then(user=>{
    req.user=user;
    next();
 })
 .catch(err=>console.log(err));
}