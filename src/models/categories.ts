import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Category extends Model{}

Category.init({
    id:{
        allowNull: false,
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        allowNull: false,
        type: DataTypes.STRING
    }
}, {
    sequelize,
    tableName: 'categories',
    modelName: 'category',
    timestamps: false
})

export default Category