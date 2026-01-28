import {return_local ,delete_local} from "../controllers/local.operator.admin.action.controller.js"
import { Router } from "express";

const router = Router()

router.route("/return_local").get(return_local)
router.route("/delete_local").post(delete_local)
export default router;