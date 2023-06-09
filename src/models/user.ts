import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { Role } from "../utils/enums";
import bcrypt, { hash } from 'bcrypt';

class User extends Model {
    static tableName = 'users';

    toJSON() {
        return { 
          ...this.get(),
          password: undefined // exclude password field
        };
    }
}

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
        allowNull: false,
        defaultValue: Role.USER,
    }
}, {
    // Other model options go here
    sequelize,
    modelName: 'user',
    timestamps: true,
    createdAt: 'created_at',
    tableName: 'users',
    updatedAt: 'updated_at',
    hooks: {
        beforeCreate: async (user: any) => {
            const saltRounds = 10
            const hashPassword = await bcrypt.hash(user.password, saltRounds)
            user.password = hashPassword
        }
    }
})

export default User