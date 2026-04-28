// routes/auth.routes.ts
import express from "express";
import { getAbilities } from "../controllers/auth.controller";

const router = express.Router();

router.get("/abilities", getAbilities);

export default router;