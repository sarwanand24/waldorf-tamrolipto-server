import Testimonial from "../models/testimonial.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const transformTestimonial = (testimonial) => {
    const obj = testimonial.toObject();

    return {
        id: obj.id,

        propertyId: obj.propertyId.toString(),

        guestName: obj.guestName,

        rating: obj.rating,

        comment: obj.comment,

        date: obj.date,

        location: obj.location || "",

        avatar: ""
    };
};

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
                testimonials.map(transformTestimonial),
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