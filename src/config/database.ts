import { Sequelize } from 'sequelize';
import { HttpError } from '../utils/errorHandler';

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

let sequelize: any;

try{
    if (dbName && dbUser && dbPassword && dbHost) {
        sequelize = new Sequelize(dbName, dbUser, dbPassword, {
            host: dbHost,
            dialect: 'mysql'
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
