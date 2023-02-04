import express from "express";
import { allowCors } from './cors';

export default function server(port: number,) {
    const server = express();
    //
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(allowCors);
    
    server.get('/', (req, res) => {
        res.json({
            service: 'API-Todo-App',
            version: '1.0.0',
            description: 'Bem vindo a API-TodoApp...'
        })
    });
    
    server.listen(port, () => {
        console.log(`Server start on port ${port}`);
    });
    return server;
}
