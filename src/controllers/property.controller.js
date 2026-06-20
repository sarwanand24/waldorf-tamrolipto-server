import Property from "../models/property.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
    uploadSingleImage,
    uploadMultipleImages,
    deleteImage
} from "../utils/cloudinaryUpload.js";

const transformProperty = (property) => {
  const obj = property.toObject();

  delete obj._id;
  delete obj.__v;

  return {
    ...obj,

    id: property._id.toString(),

    heroImage:
      property.heroImage?.url || "",

    images:
      property.images?.map(
        (img) => img.url
      ) || [],

    socialLinks:
      property.socialLinks || {},
  };
};

export const getProperties = asyncHandler(
async(req,res)=>{

    const properties =
await Property.find()
.sort({ createdAt: -1 });

const transformed =
properties.map(
  transformProperty
);

return res.status(200).json(
  new ApiResponse(
    200,
    transformed,
    "Properties fetched successfully"
  )
);
});

export const getProperty = asyncHandler(
async(req,res)=>{

    const { id } = req.params;

    const property =
    await Property.findById(id);

    if(!property){
        throw new ApiError(
            404,
            "Property not found"
        );
    }

   return res.status(200).json(
  new ApiResponse(
    200,
    transformProperty(property),
    "Property fetched successfully"
  )
);
});

export const createProperty = asyncHandler(
async (req, res) => {

    const data = { ...req.body };

if (data.location) {
  data.location =
    JSON.parse(data.location);
}

if (data.contact) {
  data.contact =
    JSON.parse(data.contact);
}

if (data.socialLinks) {
  data.socialLinks =
    JSON.parse(data.socialLinks);
}

    if (req.files?.heroImage?.[0]) {

        const uploadedHero =
        await uploadSingleImage(
            req.files.heroImage[0].path,
            "properties"
        );

        data.heroImage = {
            url: uploadedHero.url,
            publicId: uploadedHero.public_id
        };
    }

    if (req.files?.images?.length) {

        const uploadedImages =
        await uploadMultipleImages(
            req.files.images,
            "properties"
        );

        data.images =
        uploadedImages.map((image) => ({
            url: image.url,
            publicId: image.public_id
        }));
    }

    const property =
    await Property.create(data);

return res.status(201).json(
  new ApiResponse(
    201,
    transformProperty(property),
    "Property created successfully"
  )
);
});

export const updateProperty = asyncHandler(
async (req, res) => {

    const { id } = req.params;

    const property =
    await Property.findById(id);

    if (!property) {
        throw new ApiError(
            404,
            "Property not found"
        );
    }

    const data = { ...req.body };

if (data.location) {
  data.location =
    JSON.parse(data.location);
}

if (data.contact) {
  data.contact =
    JSON.parse(data.contact);
}

if (data.socialLinks) {
  data.socialLinks =
    JSON.parse(data.socialLinks);
}

    if (req.files?.heroImage?.[0]) {

        if (property.heroImage?.publicId) {
            await deleteImage(
                property.heroImage.publicId
            );
        }

        const uploadedHero =
        await uploadSingleImage(
            req.files.heroImage[0].path,
            "properties"
        );

        data.heroImage = {
            url: uploadedHero.url,
            publicId: uploadedHero.public_id
        };
    }

    if (req.files?.images?.length) {

        if (property.images?.length) {

            for (const image of property.images) {

                if (image.publicId) {
                    await deleteImage(
                        image.publicId
                    );
                }
            }
        }

        const uploadedImages =
        await uploadMultipleImages(
            req.files.images,
            "properties"
        );

        data.images =
        uploadedImages.map((image) => ({
            url: image.url,
            publicId: image.public_id
        }));
    }

    const updatedProperty =
    await Property.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );

   return res.status(200).json(
  new ApiResponse(
    200,
    transformProperty(
      updatedProperty
    ),
    "Property updated successfully"
  )
);
});

export const deleteProperty = asyncHandler(
async (req, res) => {

    const { id } = req.params;

    const property =
    await Property.findById(id);

    if (!property) {
        throw new ApiError(
            404,
            "Property not found"
        );
    }

    if (property.heroImage?.publicId) {

        await deleteImage(
            property.heroImage.publicId
        );
    }

    if (property.images?.length) {

        for (const image of property.images) {

            if (image.publicId) {

                await deleteImage(
                    image.publicId
                );
            }
        }
    }

    await property.deleteOne();

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Property deleted successfully"
        )
    );
});