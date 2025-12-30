import { Router } from "express";
import { getlocalData } from "../controllers/localDetails.controller.js";

const router = Router()

router.route("/getlocalData").post(getlocalData)

export default router;