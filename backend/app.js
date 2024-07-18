import path from 'path';
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { notFound,errorHandler, } from "./middleware/errorMiddleware.js";
dotenv.config();
//no more in use
import cors from "cors";
import uploadRoutes from './routes/uploadRoute.js'
const port = process.env.PORT;

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

connectDB() //connecting to our database

const app = express();

app.use(cors());


app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/orders',orderRoutes)

app.use("/api/products", productRoutes)
app.use('/api/users', userRoutes);
app.use('/appi/upload', uploadRoutes);

app.get('/api/config/paypal', (req,res) => res.send({clientId:
 process.env.PAYPAL_CLIENT_ID
}));

// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname,'uploads')));

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server started successfully at port ${port}`);
})
