import express from "express";
import {
    submitRoomBooking
} from "../controllers/customerBooking.controller.js";

const router = express.Router();

router.post(
    "/",
    submitRoomBooking
);

export default router;