import { Router } from "express";
import multer from "multer";

import verifyJWT from "../middlewares/auth.middleware.js";

import {
    getGallery,
    getGalleryImage,
    createGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    reorderGalleryImages
}
from "../controllers/gallery.controller.js";

import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/")
.get(getGallery)
.post(
    verifyJWT,
    upload.single("image"),
    createGalleryImage
);


router.patch(
    "/reorder/images",
    verifyJWT,
    reorderGalleryImages
);

router.route("/:id")
.get(getGalleryImage)
.patch(
    verifyJWT,
    upload.single("image"),
    updateGalleryImage
)
.delete(
    verifyJWT,
    deleteGalleryImage
);


export default router;