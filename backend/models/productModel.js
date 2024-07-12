import mongoose from "mongoose";

//review Schema
const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//product schema
const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name field is required"],
    },
    image: {
      type: String,
      required: [true, "Image field is required"],
    },
    brand: {
      type: String,
      required: [true, "Brand field is required"],
    },
    category: {
      type: String,
      required: [true, "Category field is required"],
    },
    description: {
      type: String,
      required: [true, "Description field is required"],
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      default: 0,
    },
    numReviews: {
      type: Number,
      required: [true, "numReviews is required"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Price field is required"],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, "Count in Stock is required"],
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
