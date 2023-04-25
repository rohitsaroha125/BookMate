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
const HttpErrorClass_1 = __importDefault(require("../utils/HttpErrorClass"));
class CRUDController {
    constructor(model) {
        this.model = model;
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, limit = 10, orderBy = 'id', orderDir = 'asc' } = req.query;
                const offset = (Number(page) - 1) * Number(limit);
                const order = [[orderBy, orderDir]];
                const records = yield this.model.findAndCountAll({
                    limit: Number(limit),
                    offset,
                    order
                });
                const totalPages = Math.ceil(records.count / Number(limit));
                res.status(200).json({
                    status: "success",
                    message: `Fetched All ${this.model.tableName}`,
                    data: {
                        items: records,
                        pagination: {
                            totalPages,
                            currentPage: Number(page),
                            totalIyems: records.count
                        }
                    }
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const record = yield this.model.findByPk(req.params.id);
                res.status(200).json({
                    status: "success",
                    message: `Fetched record`,
                    data: record
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const record = yield this.model.create(req.body);
                res.status(200).json({
                    status: "success",
                    message: "Successfully created",
                    data: record
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const record = yield this.model.findByPk(req.params.id);
                if (record) {
                    yield record.update(req.body);
                    res.status(200).json({
                        status: "success",
                        message: "Successfully updated",
                        data: record
                    });
                }
                else {
                    throw new HttpErrorClass_1.default(404, 'Record not found');
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const record = yield this.model.findByPk(req.params.id);
                if (record) {
                    yield record.destroy();
                    res.status(200).json({
                        status: "success",
                        message: "Successfully deleted",
                        data: record
                    });
                }
                else {
                    throw new HttpErrorClass_1.default(404, 'Record not found');
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = CRUDController;
