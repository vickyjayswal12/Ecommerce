import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import { createCategoryController, updateCategoryController, categoryControlller, singleCategoryController, deleteCategoryCOntroller } from "../controllers/categoryController.js";

const router = express.Router()

router.post('/create-category', requireSignin, isAdmin, createCategoryController)


//for update category
// /:id means we send id in url
router.put('/update-category/:id', requireSignin, isAdmin, updateCategoryController)

// get all category if user login or not so dont require middlewre
router.get('/get-category', categoryControlller)

// get single category
router.get("/single-category/:slug", singleCategoryController);

//delete category through id and also authonticaton rquire of admin
router.delete('/delete-category/:id', requireSignin, isAdmin, deleteCategoryCOntroller)
export default router