import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import routes from './routes';

dotenv.config();

const app = express();

app.use(cors({
    credentials : true
}));

app.use(compression());
app.use(cookieParser())
app.use(bodyParser.json());

const server = http.createServer(app);

app.use('/', routes());

mongoose.Promise = Promise;
mongoose.connect(process.env.DB_URL)

mongoose.connection.on('error', (error : Error) => console.error(error));

server.listen(8080, () => console.log(`Server running on http://localhost:8080`))