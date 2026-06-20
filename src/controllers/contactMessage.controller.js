import ContactMessage from "../models/contactMessage.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const getContactMessages = async (req,res,next)=>{
try {

    const {
        isRead,
        isArchived,
        search,
        page=1,
        pageSize=10
    } = req.query;

    const filter = {};

    if(isRead !== undefined){
        filter.isRead = isRead === "true";
    }

    if(isArchived !== undefined){
        filter.isArchived = isArchived === "true";
    }

    if(search){
        filter.$or = [
            {
                name:{
                    $regex:search,
                    $options:"i"
                }
            },
            {
                email:{
                    $regex:search,
                    $options:"i"
                }
            },
            {
                subject:{
                    $regex:search,
                    $options:"i"
                }
            }
        ];
    }

    const skip =
    (page - 1) * pageSize;

    const data =
    await ContactMessage
    .find(filter)
    .sort({ createdAt:-1 })
    .skip(skip)
    .limit(Number(pageSize));

    const total =
    await ContactMessage.countDocuments(filter);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                data,
                total,
                page:Number(page),
                pageSize:Number(pageSize),
                totalPages:
                Math.ceil(total/pageSize)
            },
            "Messages fetched successfully"
        )
    );

} catch(error){
    next(error);
}
};

export const getContactMessage = async (req,res,next)=>{
try {

    const message =
    await ContactMessage.findById(
        req.params.id
    );

    if(!message){
        throw new ApiError(
            404,
            "Message not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            message,
            "Message fetched successfully"
        )
    );

} catch(error){
    next(error);
}
};

export const updateContactMessage = async (req,res,next)=>{
try {

    const message =
    await ContactMessage.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true,
            runValidators:true
        }
    );

    if(!message){
        throw new ApiError(
            404,
            "Message not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            message,
            "Message updated successfully"
        )
    );

} catch(error){
    next(error);
}
};

export const deleteContactMessage = async (req,res,next)=>{
try {

    const message =
    await ContactMessage.findByIdAndDelete(
        req.params.id
    );

    if(!message){
        throw new ApiError(
            404,
            "Message not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Message deleted successfully"
        )
    );

} catch(error){
    next(error);
}
};