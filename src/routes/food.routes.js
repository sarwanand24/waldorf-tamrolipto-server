import { Router } from "express";

import {
    getFoodItems,
    getFoodItem,
    createFoodItem,
    updateFoodItem,
    deleteFoodItem
}
from "../controllers/food.controller.js";

import verifyJWT
from "../middlewares/auth.middleware.js";

import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.use(verifyJWT);

router.get(
    "/",
    getFoodItems
);

router.get(
    "/:id",
    getFoodItem
);

router.post(
    "/",
    upload.single("image"),
    createFoodItem
);

router.patch(
    "/:id",
    upload.single("image"),
    updateFoodItem
);

router.delete(
    "/:id",
    deleteFoodItem
);

export default router;