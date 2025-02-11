import express from "express";
import { adminLogin } from "../../controllers/admin/authController.js";
import { loginSchema } from "../../validators/authValidator.js";
import validateSchema from "../../middleware/validateAuth.js";

const router = express.Router();

router.post("/admin/login", validateSchema(loginSchema), adminLogin);

export default router;
