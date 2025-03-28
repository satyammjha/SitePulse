import express from "express";
import { addWebsiteController, getWebsiteController, deleteWebsiteController, getWebsiteTicksController, getDownTimeLogsController } from "../controller/websiteController";

const router = express.Router();

router.post("/add", addWebsiteController);
router.get("/get", getWebsiteController);
router.post("/delete", deleteWebsiteController);
router.post("/ticks", getWebsiteTicksController);
router.get("/getlogs/:email", getDownTimeLogsController);

export default router;