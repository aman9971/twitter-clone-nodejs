import { Router } from "express";
import { getOne, updateOne } from "./user.controller";
import followRouter from "./follow/follow.router";

const router = Router();

router.get("/:screenName", getOne);
router.put("/:screenName", updateOne);

router.use("/:screenName/follow", followRouter);

export default router;
