import RoomBooking from "../models/room.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const submitRoomBooking = async (req, res, next) => {
    try {

        const {
            propertyId,
            roomId,
            guestName,
            guestEmail,
            guestPhone,
            checkIn,
            checkOut,
            guests,
            totalPrice,
            specialRequests
        } = req.body;

        if (
            !propertyId ||
            !roomId ||
            !guestName ||
            !guestEmail ||
            !guestPhone ||
            !checkIn ||
            !checkOut ||
            !guests
        ) {
            throw new ApiError(
                400,
                "All required fields are mandatory"
            );
        }

        const booking =
            await RoomBooking.create({
                propertyId,
                roomId,

                customerName: guestName,
                email: guestEmail,
                phone: guestPhone,

                checkIn,
                checkOut,
                guests,

                totalAmount: totalPrice,

                specialRequests,

                status: "pending"
            });

        return res.status(201).json(
            new ApiResponse(
                201,
                booking,
                "Booking submitted successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};

export {
    submitRoomBooking
};