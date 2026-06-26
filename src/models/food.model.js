import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
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
            "soups",
            "starters",
            "chinese",
            "mains",
            "rice",
            "breads",
            "breakfast",
            "desserts"
        ],
        required: true
    },

    isVegetarian: {
        type: Boolean,
        default: false
    },

    isVegan: {
        type: Boolean,
        default: false
    },

    containsAllergens: [{
        type: String
    }],

    preparationTime: {
        type: Number,
        required: true
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

foodSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

export default mongoose.model(
    "Food",
    foodSchema
);