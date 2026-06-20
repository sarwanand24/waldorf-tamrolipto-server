import express from "express";

import {
    getFAQs,
    getFAQ,
    createFAQ,
    updateFAQ,
    deleteFAQ,
    reorderFAQs
} from "../controllers/faq.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/")
.get(getFAQs)
.post(
    verifyJWT,
    createFAQ
);

router.route("/reorder")
.patch(
    verifyJWT,
    reorderFAQs
);

router.route("/:id")
.get(getFAQ)
.patch(
    verifyJWT,
    updateFAQ
)
.delete(
    verifyJWT,
    deleteFAQ
);

export default router;