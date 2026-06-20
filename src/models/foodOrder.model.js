import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    }
},
{
    _id: false
}
);

const foodOrderSchema = new mongoose.Schema(
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

    items: [orderItemSchema],

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: [
            "pending",
            "accepted",
            "preparing",
            "ready",
            "completed",
            "cancelled"
        ],
        default: "pending"
    },

    roomNumber: String,

    notes: String
},
{
    timestamps: true
}
);

foodOrderSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

export default mongoose.model(
    "FoodOrder",
    foodOrderSchema
);