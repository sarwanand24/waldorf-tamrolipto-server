import express from "express";
import {
    getGallery
} from "../controllers/customerGallery.controller.js";

const router = express.Router();

router.get(
    "/:propertyId",
    getGallery
);

export default router;