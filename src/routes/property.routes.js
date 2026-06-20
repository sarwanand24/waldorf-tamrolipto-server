import { Router } from "express";

import {
    getProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty
}
from "../controllers/property.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/")
.get(getProperties)
.post(
    verifyJWT,
    upload.fields([
        {
            name: "heroImage",
            maxCount: 1
        },
        {
            name: "images",
            maxCount: 20
        }
    ]),
    createProperty
);

router.route("/:id")
.get(getProperty)
.patch(
    verifyJWT,
    upload.fields([
      {
        name: "heroImage",
        maxCount: 1
      },
      {
        name: "images",
        maxCount: 20
      }
    ]),
    updateProperty
)
.delete(
    verifyJWT,
    deleteProperty
);

export default router;