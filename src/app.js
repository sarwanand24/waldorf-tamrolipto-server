import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//ADMIN ROUTES
import authRouter from "./routes/auth.routes.js";
import propertyRouter from "./routes/property.routes.js";
import roomRouter from "./routes/room.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import foodRouter from "./routes/food.routes.js";
import barRouter from "./routes/bar.routes.js";
import reservationRouter from "./routes/tableReservation.routes.js";
import foodOrderRouter from "./routes/foodOrder.routes.js";
import galleryRouter from "./routes/gallery.routes.js";
import testimonialRouter from "./routes/testimonial.routes.js";
import faqRouter from "./routes/faq.routes.js";
import contactMessageRouter from "./routes/contactMessage.routes.js";
import analyticsRouter from "./routes/analytics.routes.js";
import settingsRouter from "./routes/setting.routes.js"
//CUSTOMER ROUTES
import customerPropertyRouter from "./routes/customer.property.routes.js";
import customerRoomRouter from "./routes/customerRoom.routes.js";
import customerFoodRouter from "./routes/customerFood.routes.js";
import customerBarRouter from "./routes/customerBar.routes.js";
import customerGalleryRouter from "./routes/customerGallery.routes.js";
import customerFAQRouter from "./routes/customerFAQ.routes.js";
import customerTestimonialRouter from "./routes/customerTestimonial.routes.js";
import customerBookingRouter from "./routes/customerBooking.routes.js";
import customerReservationRouter from "./routes/customerReservation.routes.js";
import customerFoodOrderRouter from "./routes/customerFoodOrder.routes.js";
import customerContactRouter from "./routes/customerContact.routes.js";

//ADMIN API'S
app.use("/api/auth", authRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings",bookingRouter);
app.use("/api/foods",foodRouter);
app.use("/api/bar-items",barRouter);
app.use("/api/reservations",reservationRouter);
app.use("/api/food-orders", foodOrderRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/testimonials", testimonialRouter);
app.use("/api/faqs", faqRouter);
app.use("/api/contact-messages", contactMessageRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/settings", settingsRouter);
//CUSTOMER API'S
app.use("/api/customer/properties",customerPropertyRouter);
app.use("/api/customer/rooms", customerRoomRouter);
app.use("/api/customer/foods", customerFoodRouter);
app.use("/api/customer/bars", customerBarRouter);
app.use("/api/customer/gallery", customerGalleryRouter);
app.use("/api/customer/faqs", customerFAQRouter);
app.use("/api/customer/testimonials", customerTestimonialRouter);
app.use("/api/customer/bookings", customerBookingRouter);
app.use("/api/customer/reservations", customerReservationRouter);
app.use("/api/customer/orders", customerFoodOrderRouter);
app.use("/api/customer/contact", customerContactRouter);

export default app;