import express, {Application, urlencoded, Request, Response} from 'express';
import cors from 'cors';
import usersOperation from '../src/routes/usersOpertation';

// ! Server Create
const server:Application = express();

// Middleware Declare
server.use(cors());
server.use(express.json());
server.use(urlencoded({extended: true}));

// ? Home Url
server.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "Server is running well"
    });
});

//? Router Declare 
server.use("/api/v1/authorization", usersOperation); // * User authentication

export default server;
