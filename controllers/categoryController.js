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