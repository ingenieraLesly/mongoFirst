import express from "express";

import roleController from "../controllers/roleController.js";
import roleMidd from "../middleware/roleValidate.js";
import auth from "../middleware/auth.js";
import adminMidd from "../middleware/admin.js";
import valiId from "../middleware/validId.js";

const router = express.Router();

router.post(
  "/register",
  auth,
  adminMidd,
  roleMidd.existingRole,
  roleController.registerRole
);
router.get("/list/:name?", auth, adminMidd, roleController.listRole);
router.get("/find/:_id", auth, adminMidd, valiId, roleController.getRoleById);
router.put(
  "/update",
  auth,
  adminMidd,
  roleMidd.noChanges,
  roleController.updateRole
);
router.put("/delete/:_id", auth, adminMidd, valiId, roleController.deleteRole);

export default router;
