import Bar from "../models/bar.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const getBarItems = async (req, res, next) => {
    try {

        const bars = await Bar.find({
            propertyId: req.params.propertyId,
            isAvailable: true
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                bars,
                "Bar items fetched successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};

export {
    getBarItems
};