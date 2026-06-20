import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
{
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true
    },

    guestName: {
        type: String,
        required: true,
        trim: true
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    comment: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    location: String,

    isPublished: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
}
);

testimonialSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

testimonialSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

export default mongoose.model(
    "Testimonial",
    testimonialSchema
);