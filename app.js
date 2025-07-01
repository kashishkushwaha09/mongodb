require('dotenv').config();
const express=require('express');
const app=express();
const mongoConnect=require('./utils/db-connection').mongoConnect;
const productRoute=require('./routes/productRoute');
const userRoute=require('./routes/userRoute');
const cartRoute=require('./routes/cartRoutes');
const orderRoute=require('./routes/ordersRoute');
app.use(express.json());
app.use('/api/products',productRoute);
app.use('/api/users',userRoute);
app.use('/api/carts',cartRoute);
app.use('/api/orders',orderRoute);
mongoConnect(()=>{
    app.listen(3000,()=>{
    console.log("app listen to port 3000"); 
})
})
