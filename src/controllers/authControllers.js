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
        this.restrictTo = (...roles) => __awaiter(this, void 0, void 0, function* () {
            return (req, res, next) => {
                try {
                    const { user } = req;
                    if (!user) {
                        throw new HttpErrorClass_1.default(401, 'You are not authorized to perform this action');
                    }
                    if (!roles.includes(user.role)) {
                        throw new HttpErrorClass_1.default(403, 'You do not have permission to perform this action');
                    }
                    next();
                }
                catch (err) {
                    next(err);
                }
            };
        });
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
    protect(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let token;
                if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                    token = req.headers.authorization.split(' ')[1];
                }
                if (!token) {
                    throw new HttpErrorClass_1.default(401, 'Authorization not present');
                }
                if (process.env.JWT_SECRET) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                    const user = yield this.model.findOne({
                        where: {
                            id: decoded.id
                        }
                    });
                    if (!user) {
                        throw new HttpErrorClass_1.default(404, 'No Such User found');
                    }
                    req.user = user;
                    next();
                }
                else {
                    throw new HttpErrorClass_1.default(500, 'Authorization not done');
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
