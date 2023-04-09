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
const user_1 = __importDefault(require("../models/user"));
const authRoutes = express_1.default.Router();
authRoutes.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password, role } = req.body;
        const user = yield user_1.default.create({
            email,
            name,
            password,
            role
        });
        res.status(200).json({
            status: "success",
            message: "Registration Successful!",
            data: user.toJSON()
        });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = authRoutes;
