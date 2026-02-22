import { Router } from "express";
import { saveSettings } from "../controllers/settings.controller.js";

const router = Router();

router.post("/saveSetting", saveSettings);

export default router;