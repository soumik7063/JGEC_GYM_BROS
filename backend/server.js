import express from 'express';
import dotenv, { config } from 'dotenv';
import { connectDB } from './models/DB.js';
import authRouter from './routes/authlogin.js';
import workRouter from './routes/workout.js';
import cors from 'cors';
import getWorkoutRouter from './routes/getworkout.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
app.use(cors({
    origin: ['https://jgec-gym-bros.vercel.app/','http://localhost:5173/'],
    credentials: true,
}))
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to the Gym Web API');
});
app.use('/',authRouter);
app.use('/',workRouter);
app.use('/',getWorkoutRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
export default app;