import Room from "../models/room.model.js";

const seedRooms = async (propertyMap) => {

    const rooms = [
        {
            propertyId: propertyMap[0]._id,

            name: "Single A.C",
            slug: "single-ac",

            description:
                "Enjoy a comfortable stay in our Single A.C Room, thoughtfully designed with modern comforts, a cozy bed, air conditioning, and essential amenities to ensure a relaxing experience.",

            shortDescription:
                "Cozy air-conditioned room with modern amenities",

            images: [
                {
                    url: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
                    publicId: "seed_room_1"
                },
                {
                    url: "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg",
                    publicId: "seed_room_1_2"
                }
            ],

            basePrice: 1400,
            capacity: 2,
            size: 55,
            bedType: "King",
            roomType: "standard",

            amenities: [
                "Air Conditioning",
                "Smart TV",
                "WiFi",
                "Room Service",
                "Breakfast"
            ],

            features: [
                "Spacious Interiors",
                "Comfortable Bedding",
                "Work Desk",
                "Modern Bathroom"
            ],

            views: [
                "Street View",
                "City View"
            ],

            rating: 4.9,
            reviewCount: 428,

            isAvailable: true,
            status: "available"
        },

        {
            propertyId: propertyMap[0]._id,

            name: "Executive Double",
            slug: "executive-double",

            description:
                "Modern and elegant double room perfect for business travelers or couples.",

            shortDescription:
                "Modern room for business travelers",

            images: [
                {
                    url: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
                    publicId: "seed_room_2"
                }
            ],

            basePrice: 2500,
            capacity: 2,
            size: 35,
            bedType: "Queen",
            roomType: "deluxe",

            amenities: [
                "Air Conditioning",
                "Smart TV",
                "WiFi",
                "Room Service",
                "Breakfast"
            ],

            features: [
                "Spacious Interiors",
                "Comfortable Bedding",
                "Work Desk",
                "Modern Bathroom"
            ],

            views: [
                "Street View",
                "City View"
            ],

            rating: 4.7,
            reviewCount: 312,

            isAvailable: true,
            status: "available"
        },

        {
            propertyId: propertyMap[0]._id,

            name: "Executive Triple",
            slug: "executive-triple",

            description:
                "Modern and elegant triple room perfect for business travelers or friends.",

            shortDescription:
                "Modern room for business travelers",

            images: [
                {
                    url: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
                    publicId: "seed_room_3"
                }
            ],

            basePrice: 2900,
            capacity: 3,
            size: 35,
            bedType: "Queen",
            roomType: "deluxe",

            amenities: [
                "Air Conditioning",
                "Smart TV",
                "WiFi",
                "Room Service",
                "Breakfast"
            ],

            features: [
                "Spacious Interiors",
                "Comfortable Bedding",
                "Work Desk",
                "Modern Bathroom"
            ],

            views: [
                "Street View",
                "City View"
            ],

            rating: 4.7,
            reviewCount: 312,

            isAvailable: true,
            status: "available"
        },

        {
            propertyId: propertyMap[0]._id,

            name: "Deluxe Queen",
            slug: "deluxe-queen",

            description:
                "Elegant queen room with premium interiors and comfort.",

            shortDescription:
                "Elegant queen room for a relaxing stay",

            images: [
                {
                    url: "https://images.pexels.com/photos/2549216/pexels-photo-2549216.jpeg",
                    publicId: "seed_room_4"
                }
            ],

            basePrice: 2000,
            capacity: 2,
            size: 65,
            bedType: "Queen",
            roomType: "deluxe",

            amenities: [
                "Air Conditioning",
                "Smart TV",
                "WiFi",
                "Room Service",
                "Breakfast"
            ],

            features: [
                "Spacious Interiors",
                "Comfortable Bedding",
                "Work Desk",
                "Modern Bathroom"
            ],

            views: [
                "Street View",
                "City View"
            ],

            rating: 4.9,
            reviewCount: 567,

            isAvailable: true,
            status: "available"
        },

        {
            propertyId: propertyMap[0]._id,

            name: "Premium Queen Size Bed",
            slug: "premium-queen",

            description:
                "Premium room featuring elegant interiors and modern conveniences.",

            shortDescription:
                "Premium room designed for comfort and convenience",

            images: [
                {
                    url: "https://images.pexels.com/photos/2549216/pexels-photo-2549216.jpeg",
                    publicId: "seed_room_5"
                }
            ],

            basePrice: 2600,
            capacity: 2,
            size: 65,
            bedType: "Queen",
            roomType: "deluxe",

            amenities: [
                "Air Conditioning",
                "Smart TV",
                "WiFi",
                "Room Service",
                "Breakfast"
            ],

            features: [
                "Spacious Interiors",
                "Comfortable Bedding",
                "Work Desk",
                "Modern Bathroom"
            ],

            views: [
                "Street View",
                "City View"
            ],

            rating: 4.9,
            reviewCount: 567,

            isAvailable: true,
            status: "available"
        },

        {
            propertyId: propertyMap[1]._id,

            name: "Single A.C",
            slug: "tamrolipto-single-ac",

            description:
                "Comfortable room with air conditioning and essential amenities.",

            shortDescription:
                "Cozy air-conditioned room in a serene setting",

            images: [
                {
                    url: "https://images.pexels.com/photos/2417827/pexels-photo-2417827.jpeg",
                    publicId: "seed_room_6"
                }
            ],

            basePrice: 1400,
            capacity: 6,
            size: 200,
            bedType: "King",
            roomType: "standard",

            amenities: [
                "Free WiFi",
                "Restaurant",
                "Room Service",
                "Smart TV",
                "A.C",
                "Luggage Storage",
                "Business Center",
                "Parking"
            ],

            features: [
                "Comfortable Bedding",
                "Attached Bathroom",
                "Peaceful Ambiance",
                "Daily Housekeeping"
            ],

            views: [
                "Greenery View",
                "Hotel Grounds View"
            ],

            rating: 5,
            reviewCount: 124,

            isAvailable: true,
            status: "available"
        },

        {
            propertyId: propertyMap[1]._id,

            name: "Executive Double",
            slug: "tamrolipto-executive-double",

            description:
                "Modern and elegant double room perfect for couples.",

            shortDescription:
                "Modern room for business travelers",

            images: [
                {
                    url: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
                    publicId: "seed_room_7"
                }
            ],

            basePrice: 1800,
            capacity: 2,
            size: 35,
            bedType: "Queen",
            roomType: "deluxe",

            amenities: [
                "Free WiFi",
                "Restaurant",
                "Room Service",
                "Smart TV",
                "A.C",
                "Luggage Storage",
                "Business Center",
                "Parking"
            ],

            features: [
                "Comfortable Bedding",
                "Attached Bathroom",
                "Peaceful Ambiance",
                "Daily Housekeeping"
            ],

            views: [
                "Greenery View",
                "Hotel Grounds View"
            ],

            rating: 4.7,
            reviewCount: 312,

            isAvailable: true,
            status: "available"
        }
    ];

    await Room.deleteMany({});

    const createdRooms =
        await Room.insertMany(rooms);

    console.log(
        `✅ ${createdRooms.length} rooms seeded`
    );

    return {
        room1: createdRooms[0]._id,
        room2: createdRooms[1]._id,
        room3: createdRooms[2]._id,
        room4: createdRooms[3]._id,
        room5: createdRooms[4]._id,
        room6: createdRooms[5]._id,
        room7: createdRooms[6]._id
    };
};

export default seedRooms;