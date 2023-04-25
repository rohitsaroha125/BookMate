"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crudController_1 = __importDefault(require("../controllers/crudController"));
const categories_1 = __importDefault(require("../models/categories"));
const categoryRoutes = express_1.default.Router();
const CategoryCRUDController = new crudController_1.default(categories_1.default);
categoryRoutes.get('/', (req, res, next) => {
    CategoryCRUDController.getAll(req, res, next);
});
categoryRoutes.get('/:id', (req, res, next) => {
    CategoryCRUDController.getOne(req, res, next);
});
categoryRoutes.post('/', (req, res, next) => {
    CategoryCRUDController.create(req, res, next);
});
categoryRoutes.put('/:id', (req, res, next) => {
    CategoryCRUDController.update(req, res, next);
});
categoryRoutes.delete('/:id', (req, res, next) => {
    CategoryCRUDController.delete(req, res, next);
});
exports.default = categoryRoutes;
