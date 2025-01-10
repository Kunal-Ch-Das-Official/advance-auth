import express, {Application, urlencoded} from 'express';
import cors from 'cors';

// ! Server Create
const server:Application = express();

// Middleware Declare
server.use(cors());
server.use(express.json());
server.use(urlencoded({extended: true}));
export default server;
