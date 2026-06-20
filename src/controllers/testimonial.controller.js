import Testimonial from "../models/testimonial.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const getTestimonials = async (req,res,next)=>{
try {

    const {
        propertyId,
        rating,
        isPublished,
        search,
        page=1,
        pageSize=10
    } = req.query;

    const filter = {};

    if(propertyId) filter.propertyId = propertyId;
    if(rating) filter.rating = Number(rating);

    if(isPublished !== undefined){
        filter.isPublished = isPublished === "true";
    }

    if(search){
        filter.$or = [
            { guestName: { $regex: search, $options: "i" } },
            { comment: { $regex: search, $options: "i" } }
        ];
    }

    const skip =
    (Number(page) - 1) *
    Number(pageSize);

    const data = await Testimonial
    .find(filter)
    .sort({ date:-1 })
    .skip(skip)
    .limit(Number(pageSize));

    const total = await Testimonial.countDocuments(filter);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                data,
                total,
                page:Number(page),
                pageSize:Number(pageSize),
                totalPages:Math.ceil(
    total / Number(pageSize)
)
            },
            "Testimonials fetched"
        )
    );

} catch(error){
    next(error);
}
};

export const getTestimonial = async (req,res,next)=>{
try {

    const testimonial = await Testimonial
    .findById(req.params.id)

    if(!testimonial){
        throw new ApiError(404,"Testimonial not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            testimonial,
            "Testimonial fetched"
        )
    );

} catch(error){
    next(error);
}
};

export const createTestimonial = async (req,res,next)=>{
try {

    const testimonial =
    await Testimonial.create(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            testimonial,
            "Testimonial created"
        )
    );

} catch(error){
    next(error);
}
};

export const updateTestimonial = async (req,res,next)=>{
try {

    const testimonial =
    await Testimonial.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true }
    );

    if(!testimonial){
        throw new ApiError(404,"Testimonial not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            testimonial,
            "Testimonial updated"
        )
    );

} catch(error){
    next(error);
}
};

export const deleteTestimonial = async (req,res,next)=>{
try {

    const testimonial =
    await Testimonial.findByIdAndDelete(
        req.params.id
    );

    if(!testimonial){
        throw new ApiError(404,"Testimonial not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Testimonial deleted"
        )
    );

} catch(error){
    next(error);
}
};