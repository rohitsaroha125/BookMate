import { Sequelize } from 'sequelize';
import HttpError from '../utils/HttpErrorClass';

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

let sequelize: any;

const pool = {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
}

try{
    if (dbName && dbUser && dbPassword && dbHost) {
        sequelize = new Sequelize(dbName, dbUser, dbPassword, {
            host: dbHost,
            dialect: 'mysql',
            dialectOptions: {
                // Your mariadb options here
                connectTimeout: 30000
            }
        });
    } else {
        const message = process.env.NODE_ENV === 'production' ? 'Something went wrong' : 'Please make sure all the variables are loaded properly in env file'
    
        const errorStack = new Error(message).stack
        throw new HttpError(502, message, errorStack)
    }
}catch(err) {
    console.error(err)
}

export default sequelize;
