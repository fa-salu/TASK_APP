import express from "express";
import { login, register } from "../controllers/authController.js";
import { loginSchema, registerSchema } from "../validators/authValidator.js";
import validateSchema from "../middleware/validateAuth.js";

const router = express.Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);

export default router;
