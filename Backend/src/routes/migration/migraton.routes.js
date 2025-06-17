import express from "express";
import { registerAdminUser } from "../../controllers/user.controller.js";

const router = express.Router();

// user routes ===========================================================================
router.post("/register-admin-user", registerAdminUser);

export default router