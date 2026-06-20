import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    description: {
        type: String,
        required: true
    },

    shortDescription: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: [
            "hotel",
            "hotel_restaurant",
            "hotel_restaurant_bar"
        ],
        required: true
    },

    location: {
            address: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,

    coordinates: {
        lat: {
            type: Number,
            default: 0
        },

        lng: {
            type: Number,
            default: 0
        }
    }
    },

    heroImage: {
    url: String,
    publicId: String
},

images: [
    {
        url: String,
        publicId: String
    }
],

    amenities: [
        {
            type: String
        }
    ],

    rating: {
        type: Number,
        default: 0
    },

    reviewCount: {
        type: Number,
        default: 0
    },

    establishedYear: Number,

    totalRooms: {
        type: Number,
        default: 0
    },

    contact: {
        phone: String,
        email: String,
        website: String,
        whatsapp: String
    },

   socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
    }
},
{
    timestamps: true
}
);

export default mongoose.model(
    "Property",
    propertySchema
);