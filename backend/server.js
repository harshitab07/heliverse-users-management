import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/upload', uploadRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  // app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
  res.send('API is running....')
  );
} else {
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);
app.listen(port,() => 
console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));