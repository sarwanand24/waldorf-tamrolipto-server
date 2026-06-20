import Gallery from "../models/gallery.model.js";
import Property from "../models/property.model.js";

export const seedGallery = async () => {

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

    const galleryImages = [
        {
            propertyId: waldorf._id,
            image: {
                url: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
                publicId: "seed_gallery_1"
            },
            alt: "Hotel Waldorf Lobby",
            category: "hotel",
            caption: "Grand Lobby Entrance",
            order: 1
        },

        {
            propertyId: waldorf._id,
            image: {
                url: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
                publicId: "seed_gallery_2"
            },
            alt: "Waldorf Deluxe Room",
            category: "rooms",
            caption: "Deluxe King Suite",
            order: 2
        },

        {
            propertyId: waldorf._id,
            image: {
                url: "https://images.pexels.com/photos/262042/pexels-photo-262042.jpeg?auto=compress&cs=tinysrgb&w=800",
                publicId: "seed_gallery_3"
            },
            alt: "Waldorf Restaurant",
            category: "restaurant",
            caption: "Fine Dining at The Waldorf",
            order: 3
        },

        {
            propertyId: tamrolipto._id,
            image: {
                url: "https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=800",
                publicId: "seed_gallery_4"
            },
            alt: "Tamrolipto Hotel Exterior",
            category: "hotel",
            caption: "Oceanfront Paradise",
            order: 1
        },

        {
            propertyId: tamrolipto._id,
            image: {
                url: "https://images.pexels.com/photos/2549216/pexels-photo-2549216.jpeg?auto=compress&cs=tinysrgb&w=800",
                publicId: "seed_gallery_5"
            },
            alt: "Tamrolipto Ocean View Suite",
            category: "rooms",
            caption: "Ocean View Suite Balcony",
            order: 2
        },

        {
            propertyId: tamrolipto._id,
            image: {
                url: "https://images.pexels.com/photos/2417827/pexels-photo-2417827.jpeg?auto=compress&cs=tinysrgb&w=800",
                publicId: "seed_gallery_6"
            },
            alt: "Tamrolipto Beach",
            category: "amenities",
            caption: "Private Beach Access",
            order: 3
        }
    ];

    await Gallery.deleteMany({});

    await Gallery.insertMany(
        galleryImages
    );

    console.log(
        "✅ Gallery seeded"
    );
};