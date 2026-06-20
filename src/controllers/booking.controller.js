import Booking from "../models/booking.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const transformBooking = (
    booking
)=>{
    if(!booking) return null;

    return {
        id: booking._id.toString(),

        propertyId:
            booking.propertyId?._id?.toString()
            || booking.propertyId?.toString(),

        roomId:
            booking.roomId?._id?.toString()
            || booking.roomId?.toString(),

        customerName:
            booking.customerName,

        email:
            booking.email,

        phone:
            booking.phone,

        checkIn:
            booking.checkIn,

        checkOut:
            booking.checkOut,

        guests:
            booking.guests,

        specialRequests:
            booking.specialRequests,

        status:
            booking.status,

        totalAmount:
            booking.totalAmount,

        notes:
            booking.notes,

        createdAt:
            booking.createdAt,

        updatedAt:
            booking.updatedAt,

        property:
            booking.propertyId &&
            typeof booking.propertyId === "object"
            ? {
                id:
                booking.propertyId._id,
                name:
                booking.propertyId.name
            }
            : undefined,

        room:
            booking.roomId &&
            typeof booking.roomId === "object"
            ? {
                id:
                booking.roomId._id,
                name:
                booking.roomId.name
            }
            : undefined
    };
};

export const getBookings = async (req,res,next)=>{
try{

    const {
        page = 1,
        pageSize = 10,
        propertyId,
        status,
        startDate,
        endDate,
        search
    } = req.query;

    const query = {};

    if(propertyId){
        query.propertyId = propertyId;
    }

    if(status){
        query.status = status;
    }

    if(startDate || endDate){

        query.checkIn = {};

        if(startDate){
            query.checkIn.$gte = new Date(startDate);
        }

        if(endDate){
            query.checkIn.$lte = new Date(endDate);
        }
    }

    if(search){

        query.$or = [
            {
                customerName:{
                    $regex:search,
                    $options:"i"
                }
            },
            {
                email:{
                    $regex:search,
                    $options:"i"
                }
            }
        ];
    }

    const skip =
    (Number(page)-1) *
    Number(pageSize);

    const bookings =
    await Booking.find(query)
    .populate("roomId")
    .populate("propertyId")
    .skip(skip)
    .limit(Number(pageSize))
    .sort({createdAt:-1});

    const total =
    await Booking.countDocuments(query);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                data: bookings.map(
  transformBooking
),
                total,
                page:Number(page),
                pageSize:Number(pageSize),
                totalPages:Math.ceil(
                    total / Number(pageSize)
                )
            },
            "Bookings fetched"
        )
    );

}catch(error){
    next(error);
}
};

export const getBooking = async (req,res,next)=>{
try{

    const booking =
    await Booking.findById(req.params.id)
    .populate("roomId")
    .populate("propertyId");

    if(!booking){
        throw new ApiError(
            404,
            "Booking not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            transformBooking(
  booking
),
            "Booking fetched"
        )
    );

}catch(error){
    next(error);
}
};

export const updateBookingStatus =
async (req,res,next)=>{
try{

    const { status, notes } = req.body;

    const booking =
    await Booking.findById(
        req.params.id
    );

    if(!booking){
        throw new ApiError(
            404,
            "Booking not found"
        );
    }

    booking.status = status;

    if(notes){
        booking.notes = notes;
    }

    await booking.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            transformBooking(
  booking
),
            "Booking updated"
        )
    );

}catch(error){
    next(error);
}
};