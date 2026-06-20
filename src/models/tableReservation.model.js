import mongoose from "mongoose";

const tableReservationSchema = new mongoose.Schema(
{
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
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

    date: {
        type: String,
        required: true
    },

    time: {
        type: String,
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
            "completed",
            "cancelled"
        ],
        default: "pending"
    },

    tableNumber: String
},
{
    timestamps: true
}
);

tableReservationSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  }
});

export default mongoose.model(
    "TableReservation",
    tableReservationSchema
);