import express from "express";

import {
    getReservations,
    getReservation,
    updateReservationStatus
}
from "../controllers/tableReservation.controller.js";

import verifyJWT
from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyJWT);

router.get(
    "/",
    getReservations
);

router.get(
    "/:id",
    getReservation
);

router.patch(
    "/:id/status",
    updateReservationStatus
);

export default router;