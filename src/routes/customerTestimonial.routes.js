import express from "express";
import {
    getTestimonials
} from "../controllers/customerTestimonial.controller.js";

const router = express.Router();

router.get(
    "/:propertyId",
    getTestimonials
);

export default router;