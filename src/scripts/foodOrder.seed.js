import FoodOrder from "../models/foodOrder.model.js";
import Property from "../models/property.model.js";

export const seedFoodOrders = async () => {

    const properties = await Property.find();

    const propertyMap = {
        prop_1: properties.find(
            p => p.slug === "hotel-the-waldorf"
        )?._id,

        prop_2: properties.find(
            p => p.slug === "hotel-tamrolipto"
        )?._id
    };

    const foodOrders = [
        {
            propertyId: propertyMap.prop_1,

            customerName: "Robert Chen",
            email: "r.chen@company.com",
            phone: "+1 (555) 345-6789",

            items: [
                {
                    name: "Truffle Risotto",
                    quantity: 1,
                    price: 42
                },
                {
                    name: "Grilled Sea Bass",
                    quantity: 1,
                    price: 56
                },
                {
                    name: "Caesar Salad",
                    quantity: 1,
                    price: 18
                }
            ],

            totalAmount: 116,
            status: "preparing",
            roomNumber: "Suite 301",
            notes: "No salt on the fish"
        },

        {
            propertyId: propertyMap.prop_2,

            customerName: "Sarah Mitchell",
            email: "sarah.m@email.com",
            phone: "+1 (555) 234-5678",

            items: [
                {
                    name: "Wagyu Beef Steak",
                    quantity: 2,
                    price: 185
                },
                {
                    name: "Grilled Octopus",
                    quantity: 1,
                    price: 38
                },
                {
                    name: "Chocolate Fondant",
                    quantity: 2,
                    price: 16
                }
            ],

            totalAmount: 440,
            status: "pending",
            notes: "Medium rare for steaks"
        },

        {
            propertyId: propertyMap.prop_2,

            customerName: "Emily Rodriguez",
            email: "emily.r@email.com",
            phone: "+1 (555) 456-7890",

            items: [
                {
                    name: "Vegan Buddha Bowl",
                    quantity: 2,
                    price: 26
                },
                {
                    name: "Tropical Mocktail",
                    quantity: 2,
                    price: 12
                }
            ],

            totalAmount: 76,
            status: "completed"
        }
    ];

    await FoodOrder.deleteMany();

    const createdOrders =
    await FoodOrder.insertMany(
        foodOrders
    );

    console.log(
        `✅ ${createdOrders.length} Food Orders Seeded`
    );

    return createdOrders;
};