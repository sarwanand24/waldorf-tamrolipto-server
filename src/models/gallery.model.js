import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
{
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true
    },

    image: {
        url: {
            type: String,
            required: true
        },

        publicId: {
            type: String,
            required: true
        }
    },

    alt: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: [
            "hotel",
            "rooms",
            "restaurant",
            "bar",
            "amenities",
            "events"
        ],
        required: true
    },

    caption: String,

    order: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
}
);

gallerySchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

export default mongoose.model(
    "Gallery",
    gallerySchema
);