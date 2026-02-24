import { Router } from "express";
import { saveSettings, getSettings } from "../controllers/settings.controller.js";

const router = Router();

router.post("/saveSetting", saveSettings);
router.get("/", getSettings);

export default router;
