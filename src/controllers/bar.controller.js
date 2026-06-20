import BarItem from "../models/bar.model.js";
import Property from "../models/property.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
    uploadSingleImage,
    deleteImage
} from "../utils/cloudinaryUpload.js";

export const getBarItems = asyncHandler(
async (req, res) => {

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
        query.isAvailable = isAvailable === "true";
    }

    if(search){
        query.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    const total = await BarItem.countDocuments(query);

    const data = await BarItem
    .find(query)
    .skip(
  (Number(page) - 1) *
  Number(pageSize)
)
    .limit(Number(pageSize))
    .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                data,
                total,
                page: Number(page),
                pageSize: Number(pageSize),
                totalPages:
                    Math.ceil(
  total / Number(pageSize)
)
            },
            "Bar items fetched successfully"
        )
    );
});

export const getBarItem = asyncHandler(
async (req, res) => {

    const item = await BarItem.findById(
        req.params.id
    );

    if(!item){
        throw new ApiError(
            404,
            "Bar item not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            item,
            "Bar item fetched successfully"
        )
    );
});

export const createBarItem = asyncHandler(
async (req,res)=>{

    const property =
    await Property.findById(
        req.body.propertyId
    );

    if(!property){
        throw new ApiError(
            404,
            "Property not found"
        );
    }

    if(!req.file){
        throw new ApiError(
            400,
            "Bar item image required"
        );
    }

    const uploadedImage =
    await uploadSingleImage(
        req.file.path,
        "bar-items"
    );

    const item =
    await BarItem.create({
        ...req.body,

        image: {
            url: uploadedImage.url,
            publicId:
            uploadedImage.public_id
        }
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            item,
            "Bar item created successfully"
        )
    );
});

export const updateBarItem = asyncHandler(
async (req,res)=>{

    const item =
    await BarItem.findById(
        req.params.id
    );

    if(!item){
        throw new ApiError(
            404,
            "Bar item not found"
        );
    }

    if(req.file){

        if(item.image?.publicId){

            await deleteImage(
                item.image.publicId
            );
        }

        const uploadedImage =
        await uploadSingleImage(
            req.file.path,
            "bar-items"
        );

        item.image = {
            url: uploadedImage.url,
            publicId:
            uploadedImage.public_id
        };
    }

    Object.assign(
        item,
        req.body
    );

    await item.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            item,
            "Bar item updated successfully"
        )
    );
});

export const deleteBarItem = asyncHandler(
async (req,res)=>{

    const item =
    await BarItem.findById(
        req.params.id
    );

    if(!item){
        throw new ApiError(
            404,
            "Bar item not found"
        );
    }

    if(item.image?.publicId){

        await deleteImage(
            item.image.publicId
        );
    }

    await item.deleteOne();

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Bar item deleted successfully"
        )
    );
});