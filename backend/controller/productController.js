import asyncHandler from "../middleware/asyncHandle.js";
import Product from "../models/productModel.js";

//@desc   Fetch all products
//@route  Get /api/products
//@access Public
// const getProducts = asyncHandler(async (req, res) => {
//   //pagination functionality
//   const pageSize = 8;
//   const page = Number(req.query.pageNumber) || 1;

//   //searching functionality
//   const keyword = req.query.keyword
//     ? { name: { $regex: req.query.keyword, $options: "i" } }
//     : {};
//   const count = await Product.countDocuments({ ...keyword });

//   const products = await Product.find({ ...keyword })
//     .limit(pageSize)
//     .skip(pageSize * (page - 1));

//   res.json({ products, page, pages: Math.ceil(count / pageSize) });
// });


const getProducts = asyncHandler(async(req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1; 
  const count = await Product.countDocuments();
  const products = await Product.find({}).limit(pageSize).skip(pageSize * (page - 1));
    res.json({products, page, pages: Math.ceil(count /pageSize)});
})
//@desc   Fetch all products
//@route  Get /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

//@desc   Create a products
//@route  Post /api/products
//@access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Simple name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Simple brand",
    category: "Simple category",
    countInStock: 23,
    numReviews: 4,
    description: "Simple discritiop",
  });

  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

//@desc   Fetch all products
//@route  PUT /api/product/:id
//@access Private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({
      message: "Product Deleted",
    });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

//@desc  Create a new review
//route POST /api/products/:id/review

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReview = product.reviews.find(
      (review) => review.usr.toString() === req.user._id.toString()
    );
    if (alreadyReview) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

//@desc   Fetch top three products /
//@route  Get /api/products/top
//@access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
