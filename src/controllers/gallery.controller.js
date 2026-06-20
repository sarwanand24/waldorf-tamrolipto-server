import Gallery from "../models/gallery.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
    uploadSingleImage,
    deleteImage
}
from "../utils/cloudinaryUpload.js";

export const getGallery = asyncHandler(
async (req,res)=>{

    const {
        propertyId,
        category,
        search,
        page = 1,
        pageSize = 20
    } = req.query;

    const query = {};

    if(propertyId){
        query.propertyId = propertyId;
    }

    if(category){
        query.category = category;
    }

    if(search){
        query.$or = [
            {
                alt: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                caption: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    const skip =
        (Number(page) - 1) *
        Number(pageSize);

    const total =
    await Gallery.countDocuments(query);

    const gallery =
    await Gallery.find(query)
    .sort({ order: 1 })
    .skip(skip)
    .limit(Number(pageSize));

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                data: gallery,
                total,
                page: Number(page),
                pageSize: Number(pageSize),
                totalPages: Math.ceil(
                    total / Number(pageSize)
                )
            },
            "Gallery fetched successfully"
        )
    );
});

export const getGalleryImage = asyncHandler(
async(req,res)=>{

    const image =
    await Gallery.findById(
        req.params.id
    );

    if(!image){
        throw new ApiError(
            404,
            "Gallery image not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            image,
            "Gallery image fetched successfully"
        )
    );
});

export const createGalleryImage = asyncHandler(
async(req,res)=>{

    const {
        propertyId,
        alt,
        category,
        caption,
        order
    } = req.body;

    if(!req.file){
        throw new ApiError(
            400,
            "Image is required"
        );
    }

    const uploaded =
    await uploadSingleImage(
        req.file.path,
        "gallery"
    );

    const image =
    await Gallery.create({
        propertyId,
        alt,
        category,
        caption,
        order,

   image: {
    url: uploaded.url,
    publicId: uploaded.public_id
}
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            image,
            "Gallery image created successfully"
        )
    );
});

export const updateGalleryImage = asyncHandler(
async(req,res)=>{

    const gallery =
    await Gallery.findById(
        req.params.id
    );

    if(!gallery){
        throw new ApiError(
            404,
            "Gallery image not found"
        );
    }

    if(req.file){

        if(gallery.image?.publicId){
            await deleteImage(
                gallery.image.publicId
            );
        }

        const uploaded =
        await uploadSingleImage(
            req.file.path,
            "gallery"
        );

     gallery.image = {
    url: uploaded.url,
    publicId: uploaded.public_id
};
    }

    if(req.body.alt){
        gallery.alt = req.body.alt;
    }

    if(req.body.category){
        gallery.category = req.body.category;
    }

    if(req.body.caption){
        gallery.caption = req.body.caption;
    }

    if(req.body.order !== undefined){
        gallery.order = req.body.order;
    }

    await gallery.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            gallery,
            "Gallery image updated successfully"
        )
    );
});

export const deleteGalleryImage = asyncHandler(
async(req,res)=>{

    const gallery =
    await Gallery.findById(
        req.params.id
    );

    if(!gallery){
        throw new ApiError(
            404,
            "Gallery image not found"
        );
    }

    if(gallery.image?.publicId){
        await deleteImage(
            gallery.image.publicId
        );
    }

    await gallery.deleteOne();

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Gallery image deleted successfully"
        )
    );
});

export const reorderGalleryImages = asyncHandler(
async(req,res)=>{

    const { images } = req.body;

    await Promise.all(
        images.map((item)=>
            Gallery.findByIdAndUpdate(
                item.id,
                {
                    order: item.order
                }
            )
        )
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Gallery reordered successfully"
        )
    );
});