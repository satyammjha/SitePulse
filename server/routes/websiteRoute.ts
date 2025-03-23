import express from "express";
import { addWebsiteController } from "../controller/websiteController";

const router = express.Router();

router.post("/add", addWebsiteController);

export default router;