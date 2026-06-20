import mongoose from "mongoose";

import Property from "../models/property.model.js";
import Room from "../models/room.model.js";
import Booking from "../models/booking.model.js";
import Food from "../models/food.model.js";
import Bar from "../models/bar.model.js";
import TableReservation from "../models/tableReservation.model.js";
import FoodOrder from "../models/foodOrder.model.js";
import Gallery from "../models/gallery.model.js";
import Testimonial from "../models/testimonial.model.js";
import FAQ from "../models/faq.model.js";
import ContactMessage from "../models/contactMessage.model.js";
import Admin from "../models/admin.model.js";

export const clearDatabase =
async () => {

  await Promise.all([
    Property.deleteMany({}),
    Room.deleteMany({}),
    Booking.deleteMany({}),
    Food.deleteMany({}),
    Bar.deleteMany({}),
    TableReservation.deleteMany({}),
    FoodOrder.deleteMany({}),
    Gallery.deleteMany({}),
    Testimonial.deleteMany({}),
    FAQ.deleteMany({}),
    ContactMessage.deleteMany({}),
    Admin.deleteMany({})
  ]);

  console.log(
    "Database cleared successfully"
  );
};