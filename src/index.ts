import "reflect-metadata";
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from "cookie-parser";


import { userAuthRouter } from './routes/authUserRoutes';
import { paymentRouter } from './routes/paymentRoutes';
import { errorCallBack } from "./utils/errorCallBack";
import { invalidRoutes } from "./utils/invalidRoutes";



dotenv.config();

const app = express();
//CORS middleware config 

app.use(cors(
    {
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
));

app.use(cookieParser()); // req cookies

app.use(morgan('dev'));
app.use(express.json());

app.use("", [userAuthRouter, paymentRouter]);


app.use(errorCallBack); //if error is thrown, this will catch it and send it to the client(ex: if user is not found)
app.use(invalidRoutes); //if no route is found, this will catch it and send it to the client


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



