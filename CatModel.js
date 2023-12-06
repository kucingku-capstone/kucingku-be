import {Sequelize} from "sequelize";

require('dotenv').config();

const db = new Sequelize('kucingku_db', process.env.KUCINGKU_USER, process.env.KUCINGKU_PASSWORD,{
    host: process.env.KUCINGKU_HOST,
    dialect: "mysql"
});

const {DataTypes} = Sequelize;

const Cat = db.define('ShelterCat',{
    name: DataTypes.STRING,
    age: DataTypes.STRING,
    gender: DataTypes.STRING,
    size: DataTypes.STRING,
    coat: DataTypes.STRING,
    breed: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
},{
    freezeTableName: true
});

export default Cat;

(async()=>{
    await db.sync();
})();
