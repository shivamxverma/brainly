import express from 'express';
import dotenv from 'dotenv';
dotenv.config({});
import {connectDB} from './db/db.js';
import router from './api/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

connectDB()
    .then(() => {
        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(cookieParser());
        app.use(router);
        app.listen(port, () => {
            console.log(`Server is started at ${port}`);
        });
    });