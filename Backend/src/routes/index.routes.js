import * as express from "express";

import userRoutes from "./user/user.routes.js";
import adminRoutes from "./admin/admin.routes.js";
import migrationRoutes from "./migration/migraton.routes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/migration", migrationRoutes);

export default router;