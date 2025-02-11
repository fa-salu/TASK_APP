import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const isAdminPasswordValid = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD
    );

    if (!isAdminPasswordValid) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token, user: { email, role: "admin" } });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
