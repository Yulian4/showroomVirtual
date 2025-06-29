import { Router } from "express";
import { methods as authentication } from "../controllers/authentication.controller.js";

const router = Router();

router.post("/register", authentication.register);
router.post("/login", authentication.login);

export default router;