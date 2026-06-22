import TableReservation from "../models/tableReservation.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const transformReservation = (reservation) => {
    const obj = reservation.toJSON();

    return {
        id: obj.id,

        propertyId: obj.propertyId.toString(),

        guestName: obj.customerName,

        guestEmail: obj.email,

        guestPhone: obj.phone,

        date: obj.date,

        time: obj.time,

        guests: obj.guests,

        specialRequests:
            obj.specialRequests || "",

        status: obj.status,

        createdAt: obj.createdAt
    };
};

const submitTableReservation = async (
    req,
    res,
    next
) => {
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
                transformReservation(
                    reservation
                ),
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