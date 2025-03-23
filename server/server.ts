import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import uptimeRoute from './routes/upTimeCheckerRoute.js';

dotenv.config();
const PORT = process.env.PORT
const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send({ message: "server is running fine" })
})
app.use('/user', userRouter);

app.use('/', uptimeRoute);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})