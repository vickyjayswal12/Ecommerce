import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
//this is middleware
// protect route by token base(using)
// jwt token request ke body me nhi uske header ke authorization me raheta hai
export const requireSignin = async (req, resp, next) => {
    try {
        // varify token which get int request
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        // this is decode and pass id
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }

}

// for admin access
export const isAdmin = async (req, resp, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return resp.status(401).send({
                success: false,
                message: "unaouthorized access",
            })
        }
        else {
            next();
        }


    } catch (error) {
        console.log(error);
        resp.status(401).send({
            success: false,
            error,
            message: "error in admin"
        });

    }
}