import express from "express";
import {
    submitTableReservation
} from "../controllers/customerReservation.controller.js";

const router = express.Router();

router.post(
    "/",
    submitTableReservation
);

export default router;