import { Router } from "express";
import { returnImli } from "../controllers/returnImli.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/returnImli").post(verifyJWT,returnImli)

export default router;