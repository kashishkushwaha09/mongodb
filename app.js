require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const app=express();
const MONGODB_URI = process.env.MONGO_URL;
// const connectToMongo = require('./utils/db-connection');
const productRoute=require('./routes/productRoute');
const userRoute=require('./routes/userRoute');
const cartRoute=require('./routes/cartRoutes');
const orderRoute=require('./routes/ordersRoute');
app.use(express.json());
app.use('/api/products',productRoute);
app.use('/api/users',userRoute);
app.use('/api/carts',cartRoute);
app.use('/api/orders',orderRoute);



const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB via Mongoose");
    app.listen(3000, () => {
      console.log("App is listening on port 3000");
    });
  } catch (err) {
    console.error("Mongoose connection failed:", err);
  }
};
connectToMongo();
  