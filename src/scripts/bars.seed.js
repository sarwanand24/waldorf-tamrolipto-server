import BarItem from "../models/bar.model.js";
import Property from "../models/property.model.js";

export const seedBars = async () => {

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

    const barItems = [

        {
            propertyId: waldorf._id,

            name: "Old Fashioned",

            description:
            "Bourbon, sugar, Angostura bitters, orange peel",

            price: 18,

            image: {
                url: "https://images.pexels.com/photos/3100983/pexels-photo-3100983.jpeg?auto=compress&cs=tinysrgb&w=400",
                public_id: ""
            },

            category: "cocktails",
            alcoholContent: 40,
            isAvailable: true
        },

        {
            propertyId: waldorf._id,

            name: "Chardonnay Reserve",

            description:
            "Napa Valley, 2020 - Notes of apple, citrus, and subtle oak",

            price: 14,

            image: {
                url: "https://images.pexels.com/photos/2984444/pexels-photo-2984444.jpeg?auto=compress&cs=tinysrgb&w=400",
                public_id: ""
            },

            category: "wines",
            alcoholContent: 13.5,
            isAvailable: true
        },

        {
            propertyId: waldorf._id,

            name: "Macallan 18",

            description:
            "Single Malt Scotch Whisky, aged 18 years",

            price: 65,

            image: {
                url: "https://images.pexels.com/photo-2602577/pexels-photo-2602577.jpeg?auto=compress&cs=tinysrgb&w=400",
                public_id: ""
            },

            category: "spirits",
            alcoholContent: 43,
            isAvailable: true
        },

        {
            propertyId: tamrolipto._id,

            name: "Ocean Sunset",

            description:
            "Rum, passion fruit, lime, grenadine, champagne float",

            price: 22,

            image: {
                url: "https://images.pexels.com/photos/3593012/pexels-photo-3593012.jpeg?auto=compress&cs=tinysrgb&w=400",
                public_id: ""
            },

            category: "cocktails",
            alcoholContent: 18,
            isAvailable: true
        },

        {
            propertyId: tamrolipto._id,

            name: "Dom Perignon 2012",

            description:
            "Vintage Champagne, rich and complex with fine bubbles",

            price: 350,

            image: {
                url: "https://images.pexels.com/photos/2984444/pexels-photo-2984444.jpeg?auto=compress&cs=tinysrgb&w=400",
                public_id: ""
            },

            category: "wines",
            alcoholContent: 12.5,
            isAvailable: true
        },

        {
            propertyId: tamrolipto._id,

            name: "Tropical Mocktail",

            description:
            "Pineapple, coconut, lime, mint - refreshing non-alcoholic",

            price: 12,

            image: {
                url: "https://images.pexels.com/photos/3220234/pexels-photo-3220234.jpeg?auto=compress&cs=tinysrgb&w=400",
                public_id: ""
            },

            category: "non_alcoholic",
            alcoholContent: 0,
            isAvailable: true
        },

        {
            propertyId: tamrolipto._id,

            name: "Craft IPA",

            description:
            "Local microbrewery IPA, citrusy and hoppy",

            price: 10,

            image: {
                url: "https://images.pexels.com/photos/1552671/pexels-photo-1552671.jpeg?auto=compress&cs=tinysrgb&w=400",
                public_id: ""
            },

            category: "beers",
            alcoholContent: 6.5,
            isAvailable: true
        }
    ];

    await BarItem.deleteMany();

    await BarItem.insertMany(
        barItems
    );

    console.log(
        "✅ Bar Items seeded successfully"
    );
};