import express from 'express';
import dotenv, { config } from 'dotenv';
import { connectDB } from './models/DB.js';
import authlogin from './routes/authlogin.js';
import workout from './routes/workout.js';
import cors from 'cors';
import analytics from "./routes/analytics.js";
import weight from "./routes/weight.js";
import getWorkoutRouter from './routes/getworkout.js';
import templateRouter from './routes/template.js';
import authRouter from './routes/authlogin.js';
import workRouter from './routes/workout.js';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://jgec-gym-bros.vercel.app"],
    credentials: true
  }
});

const PORT = process.env.PORT || 3000;

connectDB();
const allowedOrigins = [
  'http://localhost:5173',
  'https://jgec-gym-bros.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests like Postman
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to the Gym Web API');
});
app.use('/', authlogin); // Support Clerk's default /login
app.use('/api', authlogin);
app.use('/api', workout);
app.use('/api/workouts/stats', analytics);
app.use('/api/weight', weight);
app.use('/api', getWorkoutRouter);

app.use('/api', templateRouter);
app.use('/api',weight);
app.use('/api', analytics);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
