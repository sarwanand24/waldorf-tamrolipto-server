import TableReservation from "../models/tableReservation.model.js";
import Property from "../models/property.model.js";

export const seedTableReservations =
async () => {

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

    const reservations = [

        {
            propertyId: waldorf._id,

            customerName:
            "Alex Johnson",

            email:
            "alex.j@email.com",

            phone:
            "+1 (555) 111-2222",

            date:
            new Date("2024-06-15"),

            time:
            "19:00",

            guests: 4,

            specialRequests:
            "Window seat preferred. Allergies to nuts.",

            status:
            "confirmed",

            tableNumber:
            "T12"
        },

        {
            propertyId: tamrolipto._id,

            customerName:
            "Maria Garcia",

            email:
            "maria.g@email.com",

            phone:
            "+1 (555) 222-3333",

            date:
            new Date("2024-06-16"),

            time:
            "20:00",

            guests: 2,

            specialRequests:
            "Anniversary dinner - romantic setup",

            status:
            "pending"
        },

        {
            propertyId: tamrolipto._id,

            customerName:
            "David Kim",

            email:
            "d.kim@email.com",

            phone:
            "+1 (555) 333-4444",

            date:
            new Date("2024-06-14"),

            time:
            "12:30",

            guests: 6,

            specialRequests:
            "Business lunch - need quiet area",

            status:
            "completed",

            tableNumber:
            "R5"
        },

        {
            propertyId: waldorf._id,

            customerName:
            "Jennifer Lee",

            email:
            "jen.lee@email.com",

            phone:
            "+1 (555) 444-5555",

            date:
            new Date("2024-06-17"),

            time:
            "18:30",

            guests: 3,

            specialRequests:
            "",

            status:
            "pending"
        }
    ];

    await TableReservation.deleteMany();

    await TableReservation.insertMany(
        reservations
    );

    console.log(
        "✅ Table Reservations seeded successfully"
    );
};