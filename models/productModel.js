import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        //connect product and category
        category: {
            type: mongoose.ObjectId, //get category id from db
            ref: "category", //relation ship between category and product
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        photo: {
            data: Buffer,
            contentType: String,
            //phot we cant direct acces becouse photo comes through form
            //to get file easily from form we use express-formidable middleware 
        },
        shipping: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Products", productSchema);
