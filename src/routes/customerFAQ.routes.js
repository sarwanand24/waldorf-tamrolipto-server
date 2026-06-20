import express from "express";
import {
    getFAQs
} from "../controllers/customerFAQ.controller.js";

const router = express.Router();

router.get(
    "/",
    getFAQs
);

export default router;