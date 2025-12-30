import { Router } from "express";
import { addRawImli } from "../controllers/addRawImli.controller.js";

const router = Router()

router.route("/addRawImli").post(addRawImli)

export default router;