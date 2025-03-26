import express from "express";
import { addWebsiteController, getWebsiteController, deleteWebsiteController, getWebsiteTicksController } from "../controller/websiteController";

const router = express.Router();

router.post("/add", addWebsiteController);
router.get("/get", getWebsiteController);
router.post("/delete", deleteWebsiteController);
router.post("/ticks", getWebsiteTicksController);

export default router;