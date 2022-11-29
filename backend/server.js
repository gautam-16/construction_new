const dbConfig = require('./config/.env')
const Sequelize = require("sequelize");


const sequelize = new Sequelize(
  dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  dialectOptions: {
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
 },
});             
const db = {};
db.sequelize = sequelize; 
module.exports=sequelize;