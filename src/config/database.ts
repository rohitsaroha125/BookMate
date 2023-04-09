import { Sequelize } from 'sequelize';
import { HttpError } from '../utils/errorHandler';

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

let sequelize: any;

if (dbName && dbUser && dbPassword && dbHost) {
    sequelize = new Sequelize(dbName, dbUser, dbPassword, {
        host: dbHost,
        dialect: 'mysql'
    });
} else {
    throw new Error('Please make sure all the variables are loaded properly in env file')
}

export default sequelize;
