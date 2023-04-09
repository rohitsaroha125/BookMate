import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { Role } from "../utils/enums";

class User extends Model {}

User.init({
    id: {
        allowNull: false,
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING(255),
        unique: true
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(255),
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM(Role.ADMIN, Role.USER, Role.STORE),
        allowNull: false
    }
}, {
    // Other model options go here
    sequelize,
    modelName: 'User',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

