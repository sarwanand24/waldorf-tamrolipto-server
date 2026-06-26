import Food from "../models/food.model.js";
import Property from "../models/property.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
    uploadSingleImage,
    deleteImage
} from "../utils/cloudinaryUpload.js";

export const getFoodItems =
async (req,res,next)=>{
try{

    const {
        page = 1,
        pageSize = 10,
        propertyId,
        category,
        isAvailable,
        search
    } = req.query;

    const query = {};

    if(propertyId){
        query.propertyId = propertyId;
    }

    if(category){
        query.category = category;
    }

    if(isAvailable !== undefined){
        query.isAvailable =
        isAvailable === "true";
    }

    if(search){

        query.$or = [
            {
                name:{
                    $regex:search,
                    $options:"i"
                }
            },
            {
                description:{
                    $regex:search,
                    $options:"i"
                }
            }
        ];
    }

    const skip =
    (page - 1) * pageSize;

    const foods =
    await Food.find(query)
    .skip(skip)
    .limit(Number(pageSize))
    .sort({createdAt:-1});

    const total =
    await Food.countDocuments(query);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                data: foods,
                total,
                page:Number(page),
                pageSize:Number(pageSize),
                totalPages: Math.ceil(
                    total/pageSize
                )
            },
            "Food items fetched"
        )
    );

}catch(error){
    next(error);
}
};

export const getFoodItem =
async (req,res,next)=>{
try{

    const food =
    await Food.findById(
        req.params.id
    );

    if(!food){
        throw new ApiError(
            404,
            "Food item not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            food,
            "Food item fetched"
        )
    );

}catch(error){
    next(error);
}
};

export const createFoodItem = asyncHandler(async (req, res) => {

    const property = await Property.findById(req.body.propertyId);

    if (!property) {
        throw new ApiError(
            404,
            "Property not found"
        );
    }

    let image = {};

    if (req.file) {
        const uploadedImage = await uploadSingleImage(
            req.file.path,
            "foods"
        );

        image = {
            url: uploadedImage.url,
            publicId: uploadedImage.public_id
        };
    }

    const food = await Food.create({
        ...req.body,
        ...(req.file && { image })
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            food,
            "Food item created successfully"
        )
    );
});

export const updateFoodItem = asyncHandler(
async (req,res)=>{

    const food =
    await Food.findById(
        req.params.id
    );

    if(!food){
        throw new ApiError(
            404,
            "Food item not found"
        );
    }

    if(req.file){

        if(food.image?.publicId){

            await deleteImage(
                food.image.publicId
            );
        }

        const uploadedImage =
        await uploadSingleImage(
            req.file.path,
            "foods"
        );

        food.image = {
            url: uploadedImage.url,
            publicId:
            uploadedImage.public_id
        };
    }

    Object.assign(
        food,
        req.body
    );

    await food.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            food,
            "Food item updated successfully"
        )
    );
});

export const deleteFoodItem = asyncHandler(
async (req,res)=>{

    const food =
    await Food.findById(
        req.params.id
    );

    if(!food){
        throw new ApiError(
            404,
            "Food item not found"
        );
    }

    if(food.image?.publicId){

        await deleteImage(
            food.image.publicId
        );
    }

    await food.deleteOne();

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Food item deleted successfully"
        )
    );
});