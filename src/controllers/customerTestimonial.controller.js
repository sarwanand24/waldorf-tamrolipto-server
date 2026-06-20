import Testimonial from "../models/testimonial.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const getTestimonials = async (req, res, next) => {
    try {

        const testimonials = await Testimonial
            .find({
                propertyId: req.params.propertyId,
                isPublished: true
            })
            .sort({ date: -1 });

        return res.status(200).json(
            new ApiResponse(
                200,
                testimonials,
                "Testimonials fetched successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};

export {
    getTestimonials
};