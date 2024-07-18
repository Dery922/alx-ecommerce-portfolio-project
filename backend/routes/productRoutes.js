import express from "express";
const router = express.Router();
// import products from "../data/products.js";
import {getProducts, getProductById} from "../controller/productController.js"


router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

// router.get('/:id', (req, res) => {
//    const product = products.find((p) => p._id === req.params.id);
//    res.json(product)
// });

export default router;
















// import express from "express";
// import asyncHandler from "../middleware/asyncHandle.js";
// import { protect, admin } from "../middleware/authMiddleware.js";
// import {
//   getProducts,
//   getProductById,
//   createProductReview,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   getTopProducts,
// } from "../controller/productController.js";

// const router = express.Router();
// router.get("/top", getTopProducts);
// router.route("/").get(getProducts).post(protect, admin, createProduct);
// router
//   .route("/:id")
//   .get(getProductById)
//   .delete(protect, admin, deleteProduct)
//   .put(protect, admin, updateProduct);
// router.route("");

// router.route("/:id/reviews").post(protect, createProductReview);

// export default router;
