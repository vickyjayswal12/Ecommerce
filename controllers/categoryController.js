import slugify from "slugify";
//slugify is use for conver space in category name which converted into -
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, resp) => {
    try {
        const { name } = req.body
        if (!name) {
            return resp.status(401).send({ message: 'name is required' });

        }
        const existingcategory = await categoryModel.findOne({ name })
        if (existingcategory) {
            return resp.status(200).send({
                success: true,
                message: 'category already exist'
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        resp.status(201).send({
            success: true,
            message: 'new category created',
            category
        })



    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            error,
            message: 'error in category'
        })
    }
}

export const updateCategoryController = async (req, resp) => {
    try {
        const { name } = req.body;

        // req.params means we get id in url
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        //new is require into update
        resp.status(200).send({
            success: true,
            messsage: "Category Updated Successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            error,
            message: "Error while updating category",
        });
    }
}

//get all category
export const categoryControlller = async (req, resp) => {
    try {
        const category = await categoryModel.find({});
        resp.status(200).send({
            success: true,
            message: "All Categories List",
            category,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            error,
            message: "Error while getting all categories",
        });
    }
};

// get single category
export const singleCategoryController = async (req, resp) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        resp.status(200).send({
            success: true,
            message: "Get SIngle Category SUccessfully",
            category,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            error,
            message: "Error While getting Single Category",
        });
    }
};

//delete category through id and also authonticaton rquire of admin
export const deleteCategoryCOntroller = async (req, resp) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        resp.status(200).send({
            success: true,
            message: "Categry Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: "error while deleting category",
            error,
        });
    }
};
