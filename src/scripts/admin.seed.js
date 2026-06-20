import Admin from "../models/admin.model.js";

export const seedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({
      email: "owner@waldorf.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      return existingAdmin;
    }

    const admin = await Admin.create({
      name: "Nikhil Dhamgay",
      email: "owner@waldorf.com",
      password: "Admin@123",
      role: "owner",
    });

    console.log("Admin seeded:", admin.email);

    return admin;
  } catch (error) {
    console.error("Admin seeding failed:", error);
    throw error;
  }
};