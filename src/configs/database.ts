import { Sequelize } from 'sequelize';

const DB_HOSTNAME = process.env.DB_HOSTNAME as string;
const DB_PORT = process.env.DB_PORT as string;
const DB_NAME = process.env.DB_NAME as string;
const DB_USER = process.env.DB_USER as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;

const database = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOSTNAME,
    port: parseInt(DB_PORT),
    dialect: 'mysql'
})

database.authenticate()
    .then(() => console.log('Connection with database success!'))
    .catch((err) => console.log(`Error connection database  Error: ${err}`));

export { database };