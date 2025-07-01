const User=require('../models/users');
exports.addUser=(req,res,next)=>{
     const {name,email}=req.body;
      const user=new User({name,email,cart:{items:[]}});
    user.save()
    .then(result=>{
        console.log("User Created!");
        res.status(201).json({message:"User created successfully !",User:result});
    }).catch(err=>{
        console.log(err);
    })
}

exports.getUserId=(req,res,next)=>{
    User.findById(req.params.id)
    .then(user=>{
     res.status(200).json({message:"User fetched successfully !",user});
    })
    .catch(err=>{
        console.log(err);
    })
}
