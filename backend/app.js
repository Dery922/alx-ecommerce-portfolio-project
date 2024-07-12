import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
import products from "./data/products.js";
import cors from "cors"
const port = process.env.PORT;

connectDB() //connecting to our database

const app = express();

app.use(cors());


app.get("/",(req,res) =>{
  res.send("hello world")
});

app.get("/api/products", (req,res) => {
   res.json(products)
});

//getting a product using an id

app.get("/api/product/:id",(req,res) => {
    const product = products.find((p) => p._id === req.params.id)
    res.json(product);
});

console.log("hello world");
app.listen(port, () => {
  console.log(`Server started successfully at port ${port}`);
})
