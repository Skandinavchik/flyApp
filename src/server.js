import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { flightsRouter } from './routes/flightsRoutes.js';



mongoose.connect(process.env.DB_URI)
    .then(() => console.log('DB Connected 👌'))
    .catch(err => console.log(err));

const app = express();
const host = process.env.HOST;
const port = process.env.PORT;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());


app.use('/api/v1.0/flights', flightsRouter);

app.listen(port, host, () => {
    console.log(`Server started on ${host}:${port} 🚀`);
});