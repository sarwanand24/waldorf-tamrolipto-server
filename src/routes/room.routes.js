import { Router } from "express";

import {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    toggleRoomAvailability
}
from "../controllers/room.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/")
.get(getRooms)
.post(
    verifyJWT,
    upload.array("images", 20),
    createRoom
);

router.route("/:id")
.get(getRoom)
.patch(
    verifyJWT,
    upload.array("images", 20),
    updateRoom
)
.delete(
    verifyJWT,
    deleteRoom
);

router.patch(
    "/:id/status",
    verifyJWT,
    toggleRoomAvailability
);

export default router;