import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
{
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true
    },

    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },

    customerName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    checkIn: {
        type: Date,
        required: true
    },

    checkOut: {
        type: Date,
        required: true
    },

    guests: {
        type: Number,
        required: true
    },

    specialRequests: String,

    status: {
        type: String,
        enum: [
            "pending",
            "confirmed",
            "checked_in",
            "checked_out",
            "cancelled"
        ],
        default: "pending"
    },

    totalAmount: {
        type: Number,
        required: true
    },

    notes: String
},
{
    timestamps: true
}
);

export default mongoose.model(
    "Booking",
    bookingSchema
);