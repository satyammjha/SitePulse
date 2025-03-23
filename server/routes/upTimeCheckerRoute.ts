import express from 'express';
import checkUptimeController from '../controller/checkUptimeController';

const uptimeRoute = express.Router();

uptimeRoute.get('/check', checkUptimeController);
export default uptimeRoute;