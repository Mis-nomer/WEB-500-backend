import express from "express";
import ctrl from "../controllers/user.controller";
import { auth } from "../middlewares/auth";

const router = express.Router();
const { signup, signin, list, remove } = ctrl;

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/users", list);
// router.delete("/remove/:id", remove);

export default router;
