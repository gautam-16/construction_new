const dbConfig = require('./config/.env')
const Sequelize = require("sequelize");


const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  // pool: {
  //   max: dbConfig.pool.max,
  //   min: dbConfig.pool.min,
  //   acquire: dbConfig.pool.acquire,
  //   idle: dbConfig.pool.idle
  // },
  dialectOptions: {
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
 },
});             
const db = {};
// db.Sequelize = Sequelize;
db.sequelize = sequelize; 

// sequelize.authenticate().then(() => {
//     console.log("Success!");}).catch((err) => {
//         console.log(err)});
module.exports=sequelize;