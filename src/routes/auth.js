"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = __importDefault(require("../controllers/authControllers"));
const authRoutes = express_1.default.Router();
authRoutes.post('/register', (req, res, next) => {
    authControllers_1.default.register(req, res, next);
});
authRoutes.post('/login', (req, res, next) => {
    authControllers_1.default.login(req, res, next);
});
exports.default = authRoutes;
