import TableReservation from "../models/tableReservation.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const submitTableReservation = async (req, res, next) => {
    try {

        const {
            propertyId,
            guestName,
            guestEmail,
            guestPhone,
            date,
            time,
            guests,
            specialRequests
        } = req.body;

        if (
            !propertyId ||
            !guestName ||
            !guestEmail ||
            !guestPhone ||
            !date ||
            !time ||
            !guests
        ) {
            throw new ApiError(
                400,
                "All required fields are mandatory"
            );
        }

        const reservation =
            await TableReservation.create({
                propertyId,

                customerName: guestName,
                email: guestEmail,
                phone: guestPhone,

                date,
                time,
                guests,

                specialRequests,

                status: "pending"
            });

        return res.status(201).json(
            new ApiResponse(
                201,
                reservation,
                "Reservation submitted successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};

export {
    submitTableReservation
};