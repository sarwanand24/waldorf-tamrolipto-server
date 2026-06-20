import { Router } from "express";
import { login, logoutAdmin,
  getCurrentAdmin } from "../controllers/auth.controller.js";
import verifyAdmin from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", login);

router.post(
  "/logout",
  verifyAdmin,
  logoutAdmin
);

router.get(
  "/me",
  verifyAdmin,
  getCurrentAdmin
);



export default router;