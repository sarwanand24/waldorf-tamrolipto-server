import express from "express";
import {
    submitFoodOrder
} from "../controllers/customerFoodOrder.controller.js";

const router = express.Router();

router.post(
    "/",
    submitFoodOrder
);

export default router;