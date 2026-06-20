import RoomBooking from "../models/booking.model.js";
import FoodOrder from "../models/foodOrder.model.js";
import TableReservation from "../models/tableReservation.model.js";
import ContactMessage from "../models/contactMessage.model.js";
import Room from "../models/room.model.js";
import Property from "../models/property.model.js";
import FoodItem from "../models/food.model.js";
import BarItem from "../models/bar.model.js";

import ApiResponse from "../utils/ApiResponse.js";

export const getDashboardStats = async (req,res,next)=>{
try {

    const totalRoomRevenue =
    await RoomBooking.aggregate([
        {
            $match:{
                status:{
                    $in:[
                        "confirmed",
                        "checked_in",
                        "checked_out"
                    ]
                }
            }
        },
        {
            $group:{
                _id:null,
                total:{
                    $sum:"$totalAmount"
                }
            }
        }
    ]);

    const totalFoodRevenue =
    await FoodOrder.aggregate([
        {
            $group:{
                _id:null,
                total:{
                    $sum:"$totalAmount"
                }
            }
        }
    ]);

    const totalRevenue =
    (totalRoomRevenue[0]?.total || 0)
    +
    (totalFoodRevenue[0]?.total || 0);

    const totalBookings =
    await RoomBooking.countDocuments();

    const pendingBookings =
    await RoomBooking.countDocuments({
        status:"pending"
    });

    const confirmedBookings =
    await RoomBooking.countDocuments({
        status:{
            $in:[
                "confirmed",
                "checked_in"
            ]
        }
    });

    const totalRooms =
    await Room.countDocuments();

    const occupiedRooms =
    await Room.countDocuments({
        isAvailable:false
    });

    const occupancyRate =
    totalRooms === 0
    ? 0
    : Math.round(
        (occupiedRooms/totalRooms)*100
    );

    const restaurantOrders =
    await FoodOrder.countDocuments();

    const tableReservations =
    await TableReservation.countDocuments();

    const customerEnquiries =
    await ContactMessage.countDocuments({
        isRead:false
    });

    const totalGuestsAgg =
    await RoomBooking.aggregate([
        {
            $group:{
                _id:null,
                guests:{
                    $sum:"$guests"
                }
            }
        }
    ]);

    const ratingAgg =
    await Property.aggregate([
        {
            $group:{
                _id:null,
                avgRating:{
                    $avg:"$rating"
                }
            }
        }
    ]);

    const properties =
await Property.find({
    name:{
        $in:[
            "Hotel The Waldorf",
            "Hotel Tamrolipto"
        ]
    }
});

const waldorf =
properties.find(
    p=>p.name==="Hotel The Waldorf"
);

const tamrolipto =
properties.find(
    p=>p.name==="Hotel Tamrolipto"
);

const revenueByProperty =
await RoomBooking.aggregate([
    {
        $match:{
            status:{
                $in:[
                    "confirmed",
                    "checked_in",
                    "checked_out"
                ]
            }
        }
    },
    {
        $group:{
            _id:"$propertyId",
            total:{
                $sum:"$totalAmount"
            }
        }
    }
]);

const waldorfRevenue =
revenueByProperty.find(
    r =>
    String(r._id) ===
    String(waldorf?._id)
)?.total || 0;

const tamroliptoRevenue =
revenueByProperty.find(
    r =>
    String(r._id) ===
    String(tamrolipto?._id)
)?.total || 0;

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalRevenue,
                totalBookings,
                pendingBookings,
                confirmedBookings,
                occupancyRate,
                restaurantOrders,
                barOrders:0,
                tableReservations,
                customerEnquiries,
                waldorfRevenue,
                tamroliptoRevenue,
                totalGuests:
                totalGuestsAgg[0]?.guests || 0,
                averageRating:
                ratingAgg[0]?.avgRating || 0
            },
            "Dashboard stats fetched"
        )
    );

} catch(error){
    next(error);
}
};

export const getRevenueAnalytics = async (req,res,next)=>{
try {

    const properties =
    await Property.find({
        name:{
            $in:[
                "Hotel The Waldorf",
                "Hotel Tamrolipto"
            ]
        }
    });

    const waldorf =
    properties.find(
        p => p.name === "Hotel The Waldorf"
    );

    const tamrolipto =
    properties.find(
        p => p.name === "Hotel Tamrolipto"
    );

    const revenue =
    await RoomBooking.aggregate([
        {
            $group:{
                _id:{
                    year:{ $year:"$createdAt" },
                    month:{ $month:"$createdAt" },
                    propertyId:"$propertyId"
                },
                total:{
                    $sum:"$totalAmount"
                }
            }
        }
    ]);

    const map = {};

    revenue.forEach(item=>{

        const date =
        `${item._id.year}-${String(
            item._id.month
        ).padStart(2,"0")}-01`;

        if(!map[date]){
            map[date]={
                date,
                waldorf:0,
                tamrolipto:0,
                total:0
            };
        }

        if(
            String(item._id.propertyId) ===
            String(waldorf?._id)
        ){
            map[date].waldorf =
            item.total;
        }

        if(
            String(item._id.propertyId) ===
            String(tamrolipto?._id)
        ){
            map[date].tamrolipto =
            item.total;
        }

        map[date].total += item.total;
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            Object.values(map),
            "Revenue analytics fetched"
        )
    );

} catch(error){
    next(error);
}
};

export const getBookingTrends = async (req,res,next)=>{
try {

    const bookings =
    await RoomBooking.aggregate([
        {
            $group:{
                _id:{
                    year:{ $year:"$createdAt" },
                    month:{ $month:"$createdAt" }
                },
                bookings:{ $sum:1 }
            }
        }
    ]);

    const reservations =
    await TableReservation.aggregate([
        {
            $group:{
                _id:{
                    year:{ $year:"$createdAt" },
                    month:{ $month:"$createdAt" }
                },
                reservations:{ $sum:1 }
            }
        }
    ]);

    const data = bookings.map(item=>{

        const reservation =
        reservations.find(
            r =>
            r._id.year === item._id.year &&
            r._id.month === item._id.month
        );

        return {
            date:
            `${item._id.year}-${String(
                item._id.month
            ).padStart(2,"0")}-01`,

            bookings:item.bookings,

            reservations:
            reservation?.reservations || 0
        };
    });

    data.sort(
    (a,b)=>
    new Date(a.date) -
    new Date(b.date)
);

    return res.status(200).json(
        new ApiResponse(
            200,
            data,
            "Booking trends fetched"
        )
    );

}
catch(error){
    next(error);
}
};

export const getPopularRooms = async (req,res,next)=>{
try {

    const rooms =
    await RoomBooking.aggregate([
        {
            $group:{
                _id:"$roomId",
                count:{
                    $sum:1
                },
                revenue:{
                    $sum:"$totalAmount"
                }
            }
        },
        {
            $lookup:{
                from:"rooms",
                localField:"_id",
                foreignField:"_id",
                as:"room"
            }
        },
        {
            $unwind:"$room"
        },
        {
            $project:{
                _id:0,
                name:"$room.name",
                count:1,
                revenue:1
            }
        },
        {
            $sort:{
                count:-1
            }
        }
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            rooms,
            "Popular rooms fetched"
        )
    );

} catch(error){
    next(error);
}
};

export const getPopularFoods = async (req,res,next)=>{
try {

    const foods =
    await FoodOrder.aggregate([
        {
            $unwind:"$items"
        },
        {
            $group:{
                _id:"$items.name",
                count:{
                    $sum:"$items.quantity"
                },
                revenue:{
                    $sum:{
                        $multiply:[
                            "$items.quantity",
                            "$items.price"
                        ]
                    }
                }
            }
        },
        {
            $project:{
                _id:0,
                name:"$_id",
                count:1,
                revenue:1
            }
        },
        {
            $sort:{
                count:-1
            }
        }
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            foods,
            "Popular foods fetched"
        )
    );

} catch(error){
    next(error);
}
};

export const getPopularDrinks = async (req,res,next)=>{
try {

    const drinks =
    await BarItem.find()
    .select("name price");

    const data =
    drinks.map(drink=>({
        name:drink.name,
        count:0,
        revenue:0
    }));

    return res.status(200).json(
        new ApiResponse(
            200,
            data,
            "Popular drinks fetched"
        )
    );

}
catch(error){
    next(error);
}
};