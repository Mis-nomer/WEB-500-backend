import express from "express";
import ctrl from "../controllers/habit.controller";

const { add, read, remove, update } = ctrl;
const router = express.Router();

router.get("/habit", read);
router.get("/habit/:id", read);
router.post("/habit", add);
router.put("/habit/:id", update);
router.delete("/habit/:id", remove);

export default router;
