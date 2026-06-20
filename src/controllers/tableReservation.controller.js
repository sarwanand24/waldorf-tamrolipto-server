import TableReservation from "../models/tableReservation.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const getReservations = async (req, res, next) => {
try {

    const {
        propertyId,
        status,
        date,
        search,
        page = 1,
        pageSize = 10
    } = req.query;

    const query = {};

    if(propertyId)
        query.propertyId = propertyId;

    if(status)
        query.status = status;

    if(date)
        query.date = date;

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
            }
        ];
    }

    const skip =
        (Number(page) - 1) *
        Number(pageSize);

    const total =
        await TableReservation.countDocuments(
            query
        );

    const reservations =
        await TableReservation.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(pageSize));

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                data: reservations,
                total,
                page: Number(page),
                pageSize: Number(pageSize),
                totalPages: Math.ceil(
                    total / Number(pageSize)
                )
            },
            "Reservations fetched successfully"
        )
    );

} catch(error){
    next(error);
}
};

export const getReservation = async (
req,
res,
next
) => {

try {

    const reservation =
    await TableReservation.findById(
        req.params.id
    );

    if(!reservation){
        throw new ApiError(
            404,
            "Reservation not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            reservation,
            "Reservation fetched successfully"
        )
    );

} catch(error){
    next(error);
}
};

export const updateReservationStatus =
async (
req,
res,
next
) => {

try {

    const {
        status,
        tableNumber
    } = req.body;

    const reservation =
    await TableReservation.findById(
        req.params.id
    );

    if(!reservation){
        throw new ApiError(
            404,
            "Reservation not found"
        );
    }

    reservation.status = status;

    if(tableNumber){
        reservation.tableNumber =
        tableNumber;
    }

    await reservation.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            reservation,
            "Reservation updated successfully"
        )
    );

} catch(error){
    next(error);
}
};