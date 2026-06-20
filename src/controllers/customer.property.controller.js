import Property from "../models/property.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const getProperties = async (req, res, next) => {
    try {

        const properties = await Property.find();

        return res.status(200).json(
            new ApiResponse(
                200,
                properties,
                "Properties fetched successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};

export const getPropertyBySlug = async (req, res, next) => {
    try {

        const property = await Property.findOne({
            slug: req.params.slug
        });

        if (!property) {
            throw new ApiError(
                404,
                "Property not found"
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                property,
                "Property fetched successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};