import { Router } from "express";

import {
    getBookings,
    getBooking,
    updateBookingStatus
} from "../controllers/booking.controller.js";

import verifyJWT
from "../middlewares/auth.middleware.js";

import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.use(verifyJWT);

router.get(
    "/",
    getBookings
);

router.get(
    "/:id",
    getBooking
);

router.patch(
    "/:id/status",
    updateBookingStatus
);

export default router;