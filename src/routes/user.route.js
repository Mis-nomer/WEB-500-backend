import express from "express";
import ctrl from "../controllers/user.controller";
import { auth } from "../middlewares/auth";

const router = express.Router();
const {signup, googleSignin, signin, list} = ctrl;

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleSignin", googleSignin);
router.get("/users", list);

export default router;
