"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = __importDefault(require("./config/database"));
const errorHandler_1 = require("./utils/errorHandler");
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello world');
});
// routes handling
app.use('/account', auth_1.default);
app.use(errorHandler_1.errorHandler);
const port = process.env.PORT || 5000;
// Check if there are any errors when initializing Sequelize
if (database_1.default) {
    database_1.default.authenticate()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Database connection successful!');
        // const result = await sequelize.query('SELECT * FROM Users;')
        // console.log(result,'result');
    }))
        .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
}
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
