const { ObjectId } = require('bson');
const getDb = require('../utils/db-connection').getDb;
class Order {
    constructor(productId, price, quantity, totalAmount, userId) {
        this.productId = productId;
        this.price = price;
        this.quantity = quantity;
        this.totalAmount = totalAmount;
        this.userId = userId;
    }
    static save(userId) {
        const db = getDb();
        console.log(`new product is ${this}`);
        return db.collection('users').findOne({ _id: new ObjectId(userId) })
            .then(user => {
                const cartItems = user?.cart?.items || [];
                return Promise.all(
                    cartItems.map(async item => {
                        const product = await db.collection('products').findOne({ _id: item.productId })

                        const order = new Order(product._id, product.price, item.quantity, product.price * item.quantity, new ObjectId(userId));
                        return db.collection('orders').insertOne(order);

                    })
                    
                );
              
            })
            .then(orderResults => {
                console.log("All orders added", orderResults);

            return db.collection('users').updateOne(
            {_id:new ObjectId(userId)},
            {$set:{cart:{items:[]}}}
        )
        .then(updateResult =>{
            console.log("Cart has been cleared successfully!");
        console.log(updateResult );
        return {
            orderPlaced:orderResults.length,
            cartCleaned:updateResult.modifiedCount===1
        };
       }).catch(err=>{
        console.log(err);
        
       })
            })
            .catch(err => {
                console.log(err);
            })
    }
    static getOrders(userId){
         const db = getDb();
         return db.collection('orders').find({userId:new ObjectId(userId)}).toArray()
         .then(orders=>{
           return Promise.all(
            orders.map(async order=>{
                const product=await db.collection('products').findOne({_id:order.productId});
                return {...order,productTitle:product.title};
            })
           );
            
         })
         .catch(err=>{
            console.log(err);
         })
    }
}

module.exports = Order;