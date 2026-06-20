import { Router } from "express";
import {
    getRooms,
    getRoomBySlug
} from "../controllers/customerRoom.controller.js";

const router = Router();

router.get("/", getRooms);
router.get("/:propertyId/:slug", getRoomBySlug);

export default router;