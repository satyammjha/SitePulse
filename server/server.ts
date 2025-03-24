import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/userRoute';
// import uptimeRoute from './routes/upTimeCheckerRoute';
import websiteRoute from './routes/websiteRoute';
// import { checkAllWebsites } from './service/uptimeChecker';

dotenv.config();
const PORT = process.env.PORT
const app = express();
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send({ message: "server is running fine" })
})
app.use('/user', userRouter);
// app.use('/', uptimeRoute);
app.use('/website', websiteRoute)
// setInterval(checkAllWebsites, 20000);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})