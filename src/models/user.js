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
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
class User extends sequelize_1.Model {
    static init(sequelize) {
        return super.init({
            id: {
                allowNull: false,
                type: sequelize_1.DataTypes.NUMBER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(255),
                unique: true
            },
            name: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(255),
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: sequelize_1.DataTypes.ENUM("admin" /* Role.ADMIN */, "user" /* Role.USER */, "store" /* Role.STORE */),
                allowNull: false,
                defaultValue: "user" /* Role.USER */,
            }
        }, {
            // Other model options go here
            sequelize,
            modelName: 'User',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            defaultScope: {
                attributes: {
                    exclude: ["password"]
                }
            },
            hooks: {
                beforeCreate: (user) => __awaiter(this, void 0, void 0, function* () {
                    const saltRounds = 10;
                    const hashPassword = yield bcrypt_1.default.hash(user.password, saltRounds);
                    user.password = hashPassword;
                })
            }
        });
    }
    toJSON() {
        return Object.assign(Object.assign({}, this.get()), { password: undefined // exclude password field
         });
    }
}
exports.default = User;
