import FAQ from "../models/faq.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const getFAQs = async (req,res,next)=>{
try {

    const {
        category,
        search,
        page=1,
        pageSize=20
    } = req.query;

    const filter = {};

    if(category){
        filter.category = category;
    }

    if(search){
        filter.$or = [
            {
                question:{
                    $regex:search,
                    $options:"i"
                }
            },
            {
                answer:{
                    $regex:search,
                    $options:"i"
                }
            }
        ];
    }

    const skip =
(Number(page) - 1) *
Number(pageSize);

    const data = await FAQ
    .find(filter)
    .sort({ order:1 })
    .skip(skip)
    .limit(Number(pageSize));

    const total =
    await FAQ.countDocuments(filter);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                data,
                total,
                page:Number(page),
                pageSize:Number(pageSize),
                totalPages:
Math.ceil(
    total / Number(pageSize)
)
            },
            "FAQs fetched successfully"
        )
    );

} catch(error){
    next(error);
}
};
export const getFAQ = async (req,res,next)=>{
try {

    const faq =
    await FAQ.findById(req.params.id);

    if(!faq){
        throw new ApiError(
            404,
            "FAQ not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            faq,
            "FAQ fetched successfully"
        )
    );

} catch(error){
    next(error);
}
};

export const createFAQ = async (req,res,next)=>{
try {

    const validCategories = [
    "general",
    "booking",
    "rooms",
    "dining",
    "amenities",
    "policies"
];

if(
    !validCategories.includes(
        req.body.category
    )
){
    throw new ApiError(
        400,
        "Invalid category"
    );
}

    const faq =
    await FAQ.create(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            faq,
            "FAQ created successfully"
        )
    );

} catch(error){
    next(error);
}
};

export const updateFAQ = async (req,res,next)=>{
try {

    const faq =
    await FAQ.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true,
            runValidators:true
        }
    );

    if(!faq){
        throw new ApiError(
            404,
            "FAQ not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            faq,
            "FAQ updated successfully"
        )
    );

} catch(error){
    next(error);
}
};

export const deleteFAQ = async (req,res,next)=>{
try {

    const faq =
    await FAQ.findByIdAndDelete(
        req.params.id
    );

    if(!faq){
        throw new ApiError(
            404,
            "FAQ not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "FAQ deleted successfully"
        )
    );

} catch(error){
    next(error);
}
};

export const reorderFAQs = async (req,res,next)=>{
try {

    const { idOrders } = req.body;

    if(
        !idOrders ||
        !Array.isArray(idOrders)
    ){
        throw new ApiError(
            400,
            "Invalid data"
        );
    }

    await Promise.all(
        idOrders.map(item =>
            FAQ.findByIdAndUpdate(
                item.id,
                {
                    order:item.order
                }
            )
        )
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "FAQs reordered successfully"
        )
    );

} catch(error){
    next(error);
}
};