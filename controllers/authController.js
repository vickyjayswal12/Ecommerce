//this folder in all file is use for callback function in api
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, resp) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // validation
        if (!name) {
            //if we will not return than further(aage ka) code excute hota rahega 
            return resp.send({ error: 'name is require' })
        }
        if (!email) {
            return resp.send({ error: 'email is require' })
        }
        if (!password) {
            return resp.send({ error: 'password is require' })
        }
        if (!phone) {
            return resp.send({ error: 'phone no is require' })
        }
        if (!address) {
            return resp.send({ error: 'address is require' })
        }

        //check she/he is existing user or not
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return resp.status(200).send({
                success: true,
                message: "already register please login",
            })
        }

        //register user
        // first encrypt password
        const hashedPassword = await hashPassword(password);

        //save
        //we can paas direct req body here we password encrypted so cant direct store
        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save();
        // console.log(user);
        resp.status(201).send({
            success: true,
            message: 'user registration successfully',
            user,
        })


    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
};

// export default { registerController };



// post login
export const loginController = async (req, resp) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email, !password) {
            return resp.status(404).send({
                success: false,
                message: 'invalid password or email'
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return resp.status(404).send({
                success: false,
                message: "email is not registred"
            })
        }
        //for comparing password which get through user and encrypt password which stored in db
        const match = await comparePassword(password, user.password);
        if (!match) {
            return resp.status(200).send({
                success: false,
                message: "invalid password"
            })
        }

        //token generate
        //user ke id se token generate jo 7 din me expire ho jayega
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        resp.status(200).send({
            // all this send to client which can be use in varification using token or user detail
            success: true,
            message: "login successfully",

            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token,
        });

    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
};


//for testing jwt varification using middleware
export const test = (req, resp) => {
    resp.send("hello")

}