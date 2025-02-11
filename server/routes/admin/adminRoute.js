import express from "express";
import { adminLogin } from "../../controllers/admin/authController.js";

const router = express.Router();

router.post("/admin/login", adminLogin);

export default router;
