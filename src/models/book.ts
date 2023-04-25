import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Category from "./categories";

class Book extends Model{}

Book.init({
    id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.NUMBER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(255),
    },
    author: {
        allowNull: false,
        type: DataTypes.STRING(255),
    },
    isbn: {
        allowNull: false,
        type: DataTypes.STRING(255)
    },
    category_id: {
        allowNull: false,
        type: DataTypes.NUMBER,
        references: {
            model: Category,
            key: 'id'
        }
    },
    is_available: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    sequelize,
    modelName: 'book',
    tableName: 'books',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

Book.belongsTo(Category, {foreignKey: 'category_id'})

export default Book