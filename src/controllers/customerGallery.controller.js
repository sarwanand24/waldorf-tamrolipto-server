import Gallery from "../models/gallery.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const transformGallery = (item) => {
    const obj = item.toObject();

    return {
        id: obj._id.toString(),

        propertyId: obj.propertyId.toString(),

        url: obj.image?.url || "",

        thumbnail: obj.image?.url || "",

        alt: obj.alt,

        category:
            obj.category === "bar"
                ? "amenities"
                : obj.category,

        caption: obj.caption || ""
    };
};

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
                gallery.map(transformGallery),
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