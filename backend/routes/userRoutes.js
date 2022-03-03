import express from "express";

import userController from "../controllers/userController.js";
import roleMidd from "../middleware/roleValidate.js";
import userMidd from "../middleware/userValidate.js";
import adminMidd from "../middleware/admin.js";
import auth from "../middleware/auth.js";
import validId from "../middleware/validId.js";

const router = express.Router();

router.post(
  "/register",
  userMidd.existingUser,
  roleMidd.getRoleUser,
  userController.registerUser
);

router.post(
  "/registerAdminUser",
  userMidd.validRole,
  userMidd.existingUser,
  auth,
  adminMidd,
  userController.registerUser
);

router.get("/listUsers/:name?", auth, adminMidd, userController.listUser);

router.get(
  "/listAllUsers/:name?",
  auth,
  adminMidd,
  userController.listUserAdmin
);

router.get("/getRole/:email", auth, userController.getUserRole);

router.get("findUser/:_id", auth, validId, adminMidd, userController.findUser);

router.put(
  "/updateUser",
  auth,
  userMidd.validDataUpdate,
  userController.updateUser
);

router.put(
  "/updateUserAdmin",
  auth,
  adminMidd,
  userMidd.validDataUpdate,
  userMidd.validRole,
  userController.updateUser
);

router.put("/deleteUser/:_id", auth, validId, userController.deleteUser);

router.post("/login", userController.login);

export default router;
