const Order = require('../models/orders');
exports.postOrders = async (req, res, next) => {
    const userId = req.body.userId;
    req.user.populate('cart.items.productId')
    .then(populatedUser=>{
        const cartItems=populatedUser.cart.items;
             const orderPromises = cartItems.map(async item => {
            const product = item.productId
            const order = new Order({
                productId: product._id,
                price: product.price,
                quantity: item.quantity,
                totalAmount: product.price * item.quantity,
                userId
            });
            return order.save();
        });
        return Promise.all(orderPromises);
    })
    .then(orderResults=>{
          req.user.cart.items=[];
          return req.user.save().then(updatedUser => {
      return { orderResults, updatedUser }; 
    });
    })
    .then(({ orderResults }) => {
    res.status(201).json({
      message: "Order created successfully!",
      orderPlaced: orderResults.length,
      cartCleaned: true
    });
})
.catch(err => {
    console.error("Order creation failed:", err);
    res.status(500).json({ message: "Something went wrong" });
  });
    // const populatedUser = await req.user.populate('cart.items.productId');
    // const cartItems = populatedUser.cart.items;
    
    //    const orderPromises = cartItems.map(async item => {
    //         const product = item.productId
    //         const order = new Order({
    //             productId: product._id,
    //             price: product.price,
    //             quantity: item.quantity,
    //             totalAmount: product.price * item.quantity,
    //             userId
    //         });
    //         return order.save();
    //     });
    //     const orderResults = await Promise.all(orderPromises);
           
    //           req.user.cart.items=[];
    //          const updatedUser = await req.user.save(); 
    //              res.status(201).json({ message: "Order created successfully !",
    //                 orderPlaced:orderResults.length,
    //                cartCleaned:true
    //               });
           
    

}
exports.getOrders = (req, res, next) => {
    const userId = req.params.userId;
    Order.find({userId}).populate([
        {path:'productId',select:'title description'},
        {path:'userId', select:'name email'}
    ])
        .then(orders => {
            console.log(orders);
            res.status(200).json({ message: "Orders fetched successfully !", orders })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "something went wrong" })
        })

}
