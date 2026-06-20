import express from "express";

import { getSettings, updateBusinessSettings, updateSocialLinks,
    updateProfile, changePassword, updateNotifications } from "../controllers/settings.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";


const router = express.Router();

router.get("/", verifyJWT, getSettings);

router.patch(
  "/business",
  updateBusinessSettings
);

router.patch(
  "/social",
  updateSocialLinks
);

router.patch(
  "/profile",
  verifyJWT,
  updateProfile
);

router.patch(
  "/change-password",
  verifyJWT,
  changePassword
);

router.patch(
  "/notifications",
  updateNotifications
);

export default router;