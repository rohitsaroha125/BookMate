"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const errorHandler_1 = require("../utils/errorHandler");
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
let sequelize;
try {
    if (dbName && dbUser && dbPassword && dbHost) {
        sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
            host: dbHost,
            dialect: 'mysql'
        });
    }
    else {
        const message = process.env.NODE_ENV === 'production' ? 'Something went wrong' : 'Please make sure all the variables are loaded properly in env file';
        const errorStack = new Error(message).stack;
        throw new errorHandler_1.HttpError(502, message, errorStack);
    }
}
catch (err) {
    console.error(err);
}
exports.default = sequelize;
