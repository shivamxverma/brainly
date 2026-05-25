import express from 'express';
import dotenv from 'dotenv';
dotenv.config({});
import {connectDB} from './db/db.js';
import router from './api/index.js';

const app = express();

const port = process.env.PORT;

connectDB()
    .then(() => {
        app.use(express.json());
        app.use(router);
        app.listen(port, () => {
            console.log(`Server is started at ${port}`);
        });
    });