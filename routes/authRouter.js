import express from "express";
import { registerController, loginController, test } from "../controllers/authController.js"
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

// router Object
const router = express.Router()

//routing
//register post method
router.post('/register', registerController)
//login post
router.post('/login', loginController)

// for testing
//middleware hamesa url ke baad controller ke pahele kitna bhi middleware daal sakte hai
// router.get('/test', requireSignin, test)

// in this token and admin also check firs check requir then isadmin
router.get('/test', requireSignin, isAdmin, test)


export default router;