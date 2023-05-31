import express from "express";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from "../controllers/productController.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
//to get file easily from form we use express-formidable middleware 
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
    "/create-product",
    requireSignin,
    isAdmin,
    formidable(),
    createProductController
);

//update product
router.put(
    "/update-product/:pid",
    requireSignin,
    isAdmin,
    formidable(),
    updateProductController
);

//get all products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get product photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);


export default router;
