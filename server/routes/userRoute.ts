import express from "express";
import { addUserController } from "../controller/addUserController";

const router = express.Router();
console.log("router rchd");
router.post("/add", addUserController);

export default router;