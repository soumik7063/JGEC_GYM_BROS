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
import proteinRouter from './routes/protein.js';
import leaderboardRouter from './routes/leaderboard.js';
import cron from 'node-cron';
import { updateLeaderboard } from './services/leaderboardService.js';
import { Server } from 'socket.io';
import http from 'http';
import postRoutes from './routes/post.js';


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
app.use('/api', proteinRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/posts', postRoutes);

// Socket.io Presence Tracking
const onlineUsers = new Map(); // Store as userId -> userName
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', ({ userId, userName }) => {
    socket.userId = userId;
    onlineUsers.set(userId, userName || "Gym Bro");
    io.emit('online_users', Array.from(onlineUsers.entries()).map(([id, name]) => ({ id, name })));
    console.log(`User ${userName} (${userId}) is now online`);
  });

  socket.on('disconnect', () => {
    if (socket.userId) {
      onlineUsers.delete(socket.userId);
      io.emit('online_users', Array.from(onlineUsers.entries()).map(([id, name]) => ({ id, name })));
      console.log(`User ${socket.userId} disconnected`);
    }
  });
});


app.set('io', io);



// Schedule leaderboard update at midnight every day
cron.schedule('0 0 * * *', () => {
  console.log('Running scheduled leaderboard update...');
  updateLeaderboard();
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;