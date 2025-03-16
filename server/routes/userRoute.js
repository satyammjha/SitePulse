import express from 'express';
import { addUserFunc } from '../controller/addUserController.js';

const userRouter = express.Router();
console.log("userRouter");
userRouter.get('/addUser', addUserFunc);
export default userRouter;