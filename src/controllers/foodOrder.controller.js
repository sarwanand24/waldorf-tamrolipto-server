import FoodOrder from "../models/foodOrder.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const getFoodOrders =
async (req,res,next) => {

try {

    const {
        propertyId,
        status,
        search,
        page = 1,
        pageSize = 10
    } = req.query;

    const query = {};

    if(propertyId)
        query.propertyId = propertyId;

    if(status)
        query.status = status;

   if(search){
    query.$or = [
        {
            customerName: {
                $regex: search,
                $options: "i"
            }
        },
        {
            email: {
                $regex: search,
                $options: "i"
            }
        },
        {
            phone: {
                $regex: search,
                $options: "i"
            }
        },
        {
            roomNumber: {
                $regex: search,
                $options: "i"
            }
        }
    ];
}

    const skip =
        (Number(page) - 1) *
        Number(pageSize);

    const total =
        await FoodOrder.countDocuments(
            query
        );

    const orders =
        await FoodOrder.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(pageSize));

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                data: orders,
                total,
                page: Number(page),
                pageSize: Number(pageSize),
                totalPages: Math.ceil(
                    total / Number(pageSize)
                )
            },
            "Food orders fetched successfully"
        )
    );

}
catch(error){
    next(error);
}
};

export const getFoodOrder =
async (req,res,next) => {

try {

    const order =
    await FoodOrder.findById(
        req.params.id
    );

    if(!order){
        throw new ApiError(
            404,
            "Food order not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Food order fetched successfully"
        )
    );

}
catch(error){
    next(error);
}
};

export const updateFoodOrderStatus =
async (req,res,next) => {

try {

    const { status } = req.body;

    const order =
    await FoodOrder.findById(
        req.params.id
    );

    if(!order){
        throw new ApiError(
            404,
            "Food order not found"
        );
    }

    const validStatuses = [
    "pending",
    "accepted",
    "preparing",
    "ready",
    "completed",
    "cancelled"
];

if(!validStatuses.includes(status)){
    throw new ApiError(
        400,
        "Invalid order status"
    );
}

   order.status = status;

    await order.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Food order status updated"
        )
    );

}
catch(error){
    next(error);
}
};