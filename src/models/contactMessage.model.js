import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    phone: String,

    subject: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    isRead: {
        type: Boolean,
        default: false
    },

    isArchived: {
        type: Boolean,
        default: false
    },

    repliedAt: Date
},
{
    timestamps: true
}
);

contactMessageSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

export default mongoose.model(
    "ContactMessage",
    contactMessageSchema
);