"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
let sequelize;
if (dbName && dbUser && dbPassword && dbHost) {
    sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
        host: dbHost,
        dialect: 'mysql'
    });
}
else {
    throw new Error('Please make sure all the variables are loaded properly in env file');
}
exports.default = sequelize;
