import Booking from "../models/booking.model.js";
import Property from "../models/property.model.js";
import Room from "../models/room.model.js";

export const seedBookings = async () => {

    const waldorf =
    await Property.findOne({
        slug: "hotel-the-waldorf"
    });

    const tamrolipto =
    await Property.findOne({
        slug: "hotel-tamrolipto"
    });

    if(!waldorf || !tamrolipto){
        throw new Error(
            "Properties must be seeded first"
        );
    }

    const room1 =
    await Room.findOne({
        propertyId: waldorf._id,
        slug: "single-ac"
    });

    const room2 =
    await Room.findOne({
        propertyId: waldorf._id,
        slug: "executive-double"
    });

    const room3 =
    await Room.findOne({
        propertyId: waldorf._id,
        slug: "executive-triple"
    });

    const room4 =
    await Room.findOne({
        propertyId: tamrolipto._id,
        slug: "tamrolipto-single-ac"
    });

    const room5 =
    await Room.findOne({
        propertyId: tamrolipto._id,
        slug: "tamrolipto-executive-double"
    });

    await Booking.deleteMany({});

    await Booking.insertMany([
        {
            propertyId: waldorf._id,
            roomId: room1._id,

            customerName:
            "James Wilson",

            email:
            "james.wilson@email.com",

            phone:
            "+1 (555) 123-4567",

            checkIn:
            new Date("2024-06-15"),

            checkOut:
            new Date("2024-06-18"),

            guests: 2,

            specialRequests:
            "Late check-in requested, around 9 PM. Champagne on arrival.",

            status:
            "confirmed",

            totalAmount:
            1350
        },

        {
            propertyId: tamrolipto._id,
            roomId: room4._id,

            customerName:
            "Sarah Mitchell",

            email:
            "sarah.m@email.com",

            phone:
            "+1 (555) 234-5678",

            checkIn:
            new Date("2024-06-16"),

            checkOut:
            new Date("2024-06-20"),

            guests: 2,

            specialRequests:
            "Anniversary celebration - room decoration requested.",

            status:
            "pending",

            totalAmount:
            2200
        },

        {
            propertyId: waldorf._id,
            roomId: room3._id,

            customerName:
            "Robert Chen",

            email:
            "r.chen@company.com",

            phone:
            "+1 (555) 345-6789",

            checkIn:
            new Date("2024-06-14"),

            checkOut:
            new Date("2024-06-16"),

            guests: 3,

            specialRequests:
            "Airport pickup required. Meeting room needed.",

            status:
            "checked_in",

            totalAmount:
            3000
        },

        {
            propertyId: tamrolipto._id,
            roomId: room5._id,

            customerName:
            "Emily Rodriguez",

            email:
            "emily.r@email.com",

            phone:
            "+1 (555) 456-7890",

            checkIn:
            new Date("2024-06-20"),

            checkOut:
            new Date("2024-06-25"),

            guests: 4,

            specialRequests:
            "Vegetarian food preference. Kids-friendly amenities.",

            status:
            "pending",

            totalAmount:
            12500
        },

        {
            propertyId: waldorf._id,
            roomId: room2._id,

            customerName:
            "Michael Brown",

            email:
            "m.brown@email.com",

            phone:
            "+1 (555) 567-8901",

            checkIn:
            new Date("2024-06-13"),

            checkOut:
            new Date("2024-06-14"),

            guests: 1,

            specialRequests:
            "",

            status:
            "checked_out",

            totalAmount:
            320
        }
    ]);

    console.log(
        "✅ Bookings seeded"
    );
};