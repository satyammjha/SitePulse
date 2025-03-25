import express from "express";
import { addWebsiteController, getWebsiteController, deleteWebsiteController } from "../controller/websiteController";

const router = express.Router();

router.post("/add", addWebsiteController);
router.get("/get", getWebsiteController);
router.post("/delete", deleteWebsiteController);

export default router;