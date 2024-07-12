import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db";


dotenv.config();

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return {...product, user: adminUser}
        })
    } catch (error) {
        console.log(error)
    }
}