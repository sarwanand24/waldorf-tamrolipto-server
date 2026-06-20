import express from "express";
import { getFoodItems } from "../controllers/customerFood.controller.js";

const router = express.Router();

router.get("/:propertyId", getFoodItems);

export default router;