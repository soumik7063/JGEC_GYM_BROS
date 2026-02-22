import express from 'express';
import dotenv, { config } from 'dotenv';
import { connectDB } from './models/DB.js';
import authlogin from './routes/authlogin.js';
import workout from './routes/workout.js';
import cors from 'cors';
import getworkout from './routes/getworkout.js';
import analytics from "./routes/analytics.js";
import weight from "./routes/weight.js";
dotenv.config();

const app = express();
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
app.use('/', authlogin);
app.use('/', workout);
app.use('/', getworkout);
app.use('/api/workouts/stats', analytics);
app.use('/api/weight', weight);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;