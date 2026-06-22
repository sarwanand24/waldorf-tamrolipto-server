import Booking from "../models/booking.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const transformBooking = (booking) => {
  const obj = booking.toObject();

  return {
    id: obj._id.toString(),

    propertyId:
      obj.propertyId?.toString(),

    roomId:
      obj.roomId?.toString(),

    guestName:
      obj.customerName,

    guestEmail:
      obj.email,

    guestPhone:
      obj.phone,

    checkIn:
      obj.checkIn,

    checkOut:
      obj.checkOut,

    guests:
      obj.guests,

    totalAmount:
      obj.totalAmount,

    specialRequests:
      obj.specialRequests,

    status:
      obj.status === "checked_out"
        ? "completed"
        : obj.status,

    createdAt:
      obj.createdAt,
  };
};

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
            await Booking.create({
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
                 transformBooking(booking),
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