import express from "express";

import {
    getTestimonials,
    getTestimonial,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
} from "../controllers/testimonial.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/")
.get(getTestimonials)
.post(
    verifyJWT,
    createTestimonial
);

router.route("/:id")
.get(getTestimonial)
.patch(
    verifyJWT,
    updateTestimonial
)
.delete(
    verifyJWT,
    deleteTestimonial
);

export default router;