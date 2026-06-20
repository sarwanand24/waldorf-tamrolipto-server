import Food from "../models/food.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const getFoodItems = async (req, res, next) => {
    try {

        const foods = await Food.find({
            propertyId: req.params.propertyId,
            isAvailable: true
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                foods,
                "Food items fetched successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};