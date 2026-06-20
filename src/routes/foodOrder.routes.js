import express from "express";

import {
    getFoodOrders,
    getFoodOrder,
    updateFoodOrderStatus
}
from "../controllers/foodOrder.controller.js";

import verifyJWT
from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/", getFoodOrders);

router.get("/:id", getFoodOrder);

router.patch("/:id/status", updateFoodOrderStatus);

export default router;