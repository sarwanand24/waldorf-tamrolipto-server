import express from "express";
import {
    submitContactForm
} from "../controllers/customerContact.controller.js";

const router = express.Router();

router.post(
    "/",
    submitContactForm
);

export default router;