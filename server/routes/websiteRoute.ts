import express from "express";
import { addWebsiteController, getWebsiteController } from "../controller/websiteController";

const router = express.Router();

router.post("/add", addWebsiteController);
router.get("/get", getWebsiteController);

export default router;