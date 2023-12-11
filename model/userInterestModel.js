import {Sequelize} from "sequelize";

require('dotenv').config();

const db = new Sequelize('kucingku_db', process.env.KUCINGKU_USER, process.env.KUCINGKU_PASSWORD,{
    host: process.env.KUCINGKU_HOST,
    dialect: "mysql"
});

const {DataTypes} = Sequelize;

const UserInterest = db.define('UserInterest',{
    cat_Breeds: DataTypes.STRING,
    cat_Activity: DataTypes.STRING,
    cat_Color: DataTypes.STRING,
    cat_Fur: DataTypes.STRING,
    cat_FurTexture: DataTypes.STRING,
    cat_UndercoatPattern: DataTypes.STRING
},{
    freezeTableName: true
});

export default UserInterest;

(async()=>{
    await db.sync();
})();
