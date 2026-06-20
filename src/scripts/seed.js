import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";

import { seedProperties } from "./properties.seed.js";
import seedRooms  from "./rooms.seed.js";
import { seedBookings } from "./bookings.seed.js";
import { seedFoods } from "./foods.seed.js";
import { seedBars } from "./bars.seed.js";
import { seedTableReservations } from "./tableReservation.seed.js";
import { seedFoodOrders } from "./foodOrder.seed.js";
import { seedGallery } from "./gallery.seed.js";
import { seedTestimonials } from "./testimonials.seed.js";
import { seedFAQs } from "./faq.seed.js";
import { seedContactMessages } from "./contactMessage.seed.js";
import { seedAdmin } from "./admin.seed.js";
import { clearDatabase }
from "./resetDatabase.js";

console.log("URI:", process.env.MONGODB_URI);
await connectDB();
// await clearDatabase();

// const properties =
// await seedProperties();

// await seedRooms(properties);

// await seedBookings();

// await seedFoods();

// await seedBars();

// await seedTableReservations();

// await seedFoodOrders();

// await seedGallery();

// await seedTestimonials();

// await seedFAQs();

// await seedContactMessages();

await seedAdmin();

console.log("Seeding Completed");

process.exit(0);