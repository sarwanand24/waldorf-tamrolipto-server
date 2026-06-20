import Property from "../models/property.model.js";

export const seedProperties = async () => {

    await Property.deleteMany({});

    const properties = [
        {
            name: "Hotel The Waldorf",

            slug: "hotel-the-waldorf",

            description:
                "Hotel The Waldorf is a luxurious hotel offering world-class hospitality in the heart of the city. With elegantly designed rooms, exceptional dining experiences, and personalized service, we create unforgettable memories for every guest.",

            shortDescription:
                "Hotel The Waldorf, Kharagpur – A comfortable stay with modern amenities, easy accessibility, and warm hospitality for every traveler.",

            type: "hotel_restaurant",

            location: {
                address: "Chota Tengra",
                city: "Kharagpur",
                state: "West Bengal",
                country: "India",
                zipCode: "721301",
                 coordinates: {
    lat: 22.3460,
    lng: 87.2319
  }
            },

            heroImage: {
                url: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1600",
                publicId: ""
            },

            images: [
                {
                    url: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
                    publicId: ""
                },
                {
                    url: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
                    publicId: ""
                },
                {
                    url: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800",
                    publicId: ""
                }
            ],

            amenities: [
                "Free WiFi",
                "Restaurant",
                "Room Service",
                "Smart TV",
                "A.C",
                "Luggage Storage",
                "Business Center"
            ],

            rating: 4.8,

            reviewCount: 2547,

            establishedYear: 1998,

            totalRooms: 85,

            contact: {
                phone: "+91 8001092222",
                email: "hotelthewaldorf@gmail.com",
                website: "https://waldorf.com"
            },

           socialLinks: {
  facebook: "https://facebook.com/waldorf",
  instagram: "https://instagram.com/waldorf",
  twitter: "https://twitter.com/waldorf",
  linkedin: "https://linkedin.com/company/waldorf"
}
        },

        {
            name: "Hotel Tamrolipto",

            slug: "hotel-tamrolipto",

            description:
                "Hotel Tamrolipto offers a unique blend of comfort, dining, and leisure with its inviting restaurant, stylish bar, and beautifully landscaped surroundings. Enjoy a refreshing escape where nature-inspired ambiance meets exceptional hospitality.",

            shortDescription:
                "Nature-inspired hotel with restaurant and bar",

            type: "hotel_restaurant_bar",

            location: {
                address: "Saha Chowk",
                city: "Kharagpur",
                state: "West Bengal",
                country: "India",
                zipCode: "721301",
                 coordinates: {
    lat: 22.3460,
    lng: 87.2319
  }
            },

            heroImage: {
                url: "https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=1600",
                publicId: ""
            },

            images: [
                {
                    url: "https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=800",
                    publicId: ""
                },
                {
                    url: "https://images.pexels.com/photos/2549216/pexels-photo-2549216.jpeg?auto=compress&cs=tinysrgb&w=800",
                    publicId: ""
                },
                {
                    url: "https://images.pexels.com/photos/2417827/pexels-photo-2417827.jpeg?auto=compress&cs=tinysrgb&w=800",
                    publicId: ""
                }
            ],

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

            rating: 4.9,

            reviewCount: 3201,

            establishedYear: 2010,

            totalRooms: 120,

            contact: {
                phone: "+91 8001090123",
                email: "enquiryhoteltamrolipta@gmail.com",
                website: "https://tamrolipto.com"
            },

            socialLinks: {
  facebook: "https://facebook.com/tamrolipto",
  instagram: "https://instagram.com/tamrolipto",
  twitter: "https://twitter.com/tamrolipto",
  linkedin: ""
}
        }
    ];

    const createdProperties =
        await Property.insertMany(properties);

    console.log(
        "Properties Seeded:",
        createdProperties.length
    );

    return createdProperties;
};