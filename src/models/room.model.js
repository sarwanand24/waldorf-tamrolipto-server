import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
{
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    slug: {
        type: String,
        required: true,
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

    images: [
        {
            url: String,
            publicId: String
        }
    ],

    basePrice: {
        type: Number,
        required: true
    },

    capacity: {
        type: Number,
        required: true
    },

    size: {
        type: Number,
        required: true
    },

    bedType: {
        type: String,
        required: true
    },

    roomType: {
        type: String,
        enum: [
            "standard",
            "deluxe",
            "suite",
            "penthouse",
            "presidential"
        ],
        required: true
    },

    amenities: [String],

    features: [String],

    views: [String],

    rating: {
        type: Number,
        default: 0
    },

    reviewCount: {
        type: Number,
        default: 0
    },

    isAvailable: {
        type: Boolean,
        default: true
    },

    status: {
        type: String,
        enum: [
            "available",
            "occupied",
            "maintenance"
        ],
        default: "available"
    }
},
{
    timestamps: true
}
);

export default mongoose.model(
    "Room",
    roomSchema
);