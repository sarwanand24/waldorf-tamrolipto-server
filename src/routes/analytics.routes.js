import express from "express";

import {
    getDashboardStats,
    getRevenueAnalytics,
    getBookingTrends,
    getPopularRooms,
    getPopularFoods,
    getPopularDrinks
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/dashboard", getDashboardStats);
router.get("/revenue", getRevenueAnalytics);
router.get("/booking-trends", getBookingTrends);
router.get("/popular-rooms", getPopularRooms);
router.get("/popular-foods", getPopularFoods);
router.get("/popular-drinks", getPopularDrinks);

export default router;