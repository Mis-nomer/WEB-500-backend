import express from "express";
import ctrl from "../controllers/habit.controller";

const { add, get, remove, update } = ctrl;
const router = express.Router();

router.get("/habit/", get);
router.post("/habit", add);
router.put("/habit/:id", update);
router.delete("/habit/:id", remove);

export default router;
