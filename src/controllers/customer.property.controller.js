import Property from "../models/property.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const transformProperty = (property) => {
  const obj = property.toObject();

  return {
    ...obj,

    id: obj._id.toString(),

    heroImage: obj.heroImage?.url || "",

    images:
      obj.images?.map((img) => img.url) || [],

    amenities:
      obj.amenities?.map((a, index) => ({
        id: index.toString(),
        name: a,
      })) || [],
  };
};

export const getProperties = async (req, res, next) => {
    try {

        const properties = await Property.find();

        console.log('chack prop:',properties.map(transformProperty))

        return res.status(200).json(
            new ApiResponse(
                200,
                properties.map(transformProperty),
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
                transformProperty(property),
                "Property fetched successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};