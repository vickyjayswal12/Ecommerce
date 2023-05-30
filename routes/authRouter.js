import express from "express";
import { registerController, loginController, test, forgetPasswordController } from "../controllers/authController.js"
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

// router Object
const router = express.Router()

//routing
//register post method
router.post('/register', registerController)
//login post
router.post('/login', loginController)

//forget password
router.post('/forget-password', forgetPasswordController)

// for testing
//middleware hamesa url ke baad controller ke pahele kitna bhi middleware daal sakte hai
// router.get('/test', requireSignin, test)

// in this token and admin also check firs check requir then isadmin
router.get('/test', requireSignin, isAdmin, test)

// protected rout auth for check authontication user route
router.get("/user-auth", requireSignin, (req, resp) => {
    resp.status(200).send({ ok: true });
})

// protected rout auth for check authontication of admin route
router.get("/admin-auth", requireSignin, isAdmin, (req, resp) => {
    resp.status(200).send({ ok: true });
})

export default router;