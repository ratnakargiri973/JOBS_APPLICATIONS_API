import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import helmet from 'helmet'
import router from './routes/router.js';
import { loggingMiddleware } from './middlewares/morgan.js';
import errorHandler from './middlewares/errorHandler.js';
const app=express();

const PORT=process.env.PORT;

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Jobs";

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({extended:false}));
app.use(loggingMiddleware);
app.use(errorHandler);
app.use('/',router)

mongoose.connect(MONGO_URI)
.then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });