import {return_local} from "../controllers/listoflocal.controller.js"
import { Router } from "express";

const router = Router()

router.route("/getLocals").get(return_local)

export default router;