import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
{
    question: {
        type: String,
        required: true,
        trim: true
    },

    answer: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: [
            "general",
            "booking",
            "rooms",
            "dining",
            "amenities",
            "policies"
        ],
        required: true
    },

    order: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
}
);

faqSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

faqSchema.set("toObject", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

export default mongoose.model(
    "FAQ",
    faqSchema
);