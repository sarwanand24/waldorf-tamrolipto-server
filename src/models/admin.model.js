import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["owner", "admin", "manager"],
      default: "admin"
    },

    avatar: {
    url: String,
    publicId: String
    },

    refreshToken: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(
    this.password,
    10
  );
});

adminSchema.methods.isPasswordCorrect =
async function (password) {
  return await bcrypt.compare(
    password,
    this.password
  );
};

adminSchema.methods.generateAccessToken =
function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY
    }
  );
};

adminSchema.methods.generateRefreshToken =
function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );
};

const Admin = mongoose.model(
  "Admin",
  adminSchema
);

export default Admin;