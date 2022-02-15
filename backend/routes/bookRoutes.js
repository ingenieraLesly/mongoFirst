import express from "express";
import bookController from "../controllers/bookController.js";

const router = express.Router(); //Router:funcionalidad REST de express
router.post("/registerBook", roleController.registerRole)

export default router;