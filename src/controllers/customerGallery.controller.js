import Gallery from "../models/gallery.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const getGallery = async (req, res, next) => {
    try {

        const gallery = await Gallery
            .find({
                propertyId: req.params.propertyId
            })
            .sort({ order: 1 });

        return res.status(200).json(
            new ApiResponse(
                200,
                gallery,
                "Gallery fetched successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};

export {
    getGallery
};