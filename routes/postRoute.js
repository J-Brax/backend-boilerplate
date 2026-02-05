import express from "express";
import upload from "../middlewares/upload.js";
import { create } from "../controllers/postController.js";
const router = express.Router();
//create
router.post("/", upload.array("files", 10), create);
export default router;
