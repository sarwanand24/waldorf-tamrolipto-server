import mongoose from "mongoose";

const barItemSchema = new mongoose.Schema(
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

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
    url: String,
    publicId: String
},

    category: {
        type: String,
        enum: [
            "cocktails",
            "wines",
            "spirits",
            "beers",
            "non_alcoholic"
        ],
        required: true
    },

    alcoholContent: {
        type: Number,
        default: 0
    },

    isAvailable: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
}
);

barItemSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

export default mongoose.model(
    "BarItem",
    barItemSchema
);