require('dotenv-safe').config({
    allowEmptyValues: true
});
const PORT = process.env.PORT as unknown as number;

import Router from './routes/todoRoutes';
import serverExpress from './configs/server';

require('../src/models/todo');

const server = serverExpress(PORT);

server.use('/', Router)