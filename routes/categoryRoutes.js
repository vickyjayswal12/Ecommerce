import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import { createCategoryController } from "../controllers/categoryController.js";

const router = express.Router()

router.post('/create-category', requireSignin, isAdmin, createCategoryController)





export default router