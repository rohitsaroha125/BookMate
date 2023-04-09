"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = __importDefault(require("./config/database"));
const errorHandler_1 = require("./utils/errorHandler");
const app = (0, express_1.default)();
app.use(errorHandler_1.errorHandler);
const port = process.env.PORT || 5000;
// Check if there are any errors when initializing Sequelize
if (database_1.default) {
    database_1.default.authenticate()
        .then(() => {
        console.log('Database connection successful!');
    })
        .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
}
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
