import FoodOrder from "../models/foodOrder.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const submitFoodOrder = async (req, res, next) => {
    try {

        const {
            propertyId,
            guestName,
            guestPhone,
            items,
            totalPrice
        } = req.body;

        if (
            !propertyId ||
            !guestName ||
            !guestPhone ||
            !items?.length
        ) {
            throw new ApiError(
                400,
                "All required fields are mandatory"
            );
        }

        const order =
            await FoodOrder.create({
                propertyId,

                customerName: guestName,
                phone: guestPhone,

                items,

                totalAmount: totalPrice,

                status: "pending"
            });

        return res.status(201).json(
            new ApiResponse(
                201,
                order,
                "Food order submitted successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};

export {
    submitFoodOrder
};