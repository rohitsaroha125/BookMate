"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Category extends sequelize_1.Model {
}
Category.init({
    id: {
        allowNull: false,
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: database_1.default,
    tableName: 'categories',
    modelName: 'category',
    timestamps: false
});
exports.default = Category;
