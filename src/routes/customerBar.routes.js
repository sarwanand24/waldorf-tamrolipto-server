import express from "express";
import {
    getBarItems
} from "../controllers/customerBar.controller.js";

const router = express.Router();

router.get(
    "/:propertyId",
    getBarItems
);

export default router;