import { return_local, delete_local, update_local } from "../controllers/admin.operator.local.controller.js";
import { Router } from "express";

const router = Router();

router.get("/return_local", return_local);
router.post("/return_local", return_local);
router.post("/delete_local", delete_local);
router.post("/update_local", update_local);

export default router;
