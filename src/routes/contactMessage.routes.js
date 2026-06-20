import express from "express";

import {
    getContactMessages,
    getContactMessage,
    updateContactMessage,
    deleteContactMessage
} from "../controllers/contactMessage.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/")
.get(verifyJWT, getContactMessages);

router.route("/:id")
.get(getContactMessage)
.patch(
    verifyJWT,
    updateContactMessage
)
.delete(
    verifyJWT,
    deleteContactMessage
);

export default router;