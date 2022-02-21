import express from "express";
import userController from "../controllers/userController.js";
import roleMidd from "../middleware/roleValidate";
import userMidd from "../middleware/userValidate.js";
const router = express.Router();

router.post(
  "/registerUser",
  roleMidd.existingRole,
  userMidd.existingUser,
  user.registerUser
);

router.get("/listUser/:name?", userController.listUser); //si encuentras algo ejecuta el filtro puesto en controller (req.params)

router.post("/login", )

export default router;
