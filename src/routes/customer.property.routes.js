import { Router } from "express";

import {
    getProperties,
    getPropertyBySlug
}
from "../controllers/customer.property.controller.js";

const router = Router();

router.get("/", getProperties);

router.get(
    "/:slug",
    getPropertyBySlug
);

export default router;