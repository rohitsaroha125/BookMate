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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpErrorClass_1 = __importDefault(require("../utils/HttpErrorClass"));
const user_1 = __importDefault(require("../models/user"));
class AuthController {
    constructor(model) {
        this.model = model;
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name, password, role } = req.body;
                const user = yield this.model.create({
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
                console.log('error here is ', err);
                next(err);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.model.findOne({
                    where: {
                        email
                    }
                });
                if (!user) {
                    throw new HttpErrorClass_1.default(401, 'Email/Password doesn\'t exist');
                }
                else {
                    const passwordMatch = bcrypt_1.default.compare(password, user.password);
                    if (!passwordMatch) {
                        throw new HttpErrorClass_1.default(401, 'Email/Password doesn\'t exist');
                    }
                    // Generate a JWT token and send it back to the client
                    if (process.env.JWT_SECRET) {
                        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
                        res.status(200).json({
                            status: 'success',
                            message: 'Login Succesful',
                            data: token
                        });
                    }
                    else {
                        throw new HttpErrorClass_1.default(500, 'something went wrong');
                    }
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
}
const authController = new AuthController(user_1.default);
exports.default = authController;
