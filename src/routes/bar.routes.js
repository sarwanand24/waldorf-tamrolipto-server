import { Router } from "express";

import {
    getBarItems,
    getBarItem,
    createBarItem,
    updateBarItem,
    deleteBarItem
} from "../controllers/bar.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";

import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/")
.get(getBarItems)
.post(
    verifyJWT,
    upload.single("image"),
    createBarItem
)

router.route("/:id")
.get(getBarItem)
.patch(
    verifyJWT,
     upload.single("image"),
    updateBarItem
)
.delete(
    verifyJWT,
    deleteBarItem
);

export default router;