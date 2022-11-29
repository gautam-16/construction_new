const dbConfig = require('./config/.env')
const Sequelize = require("sequelize");
const cloudinary = require("cloudinary");

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
cloudinary.config({ 
  cloud_name: 'dmbnchah2', 
  api_key: '248667228425679', 
  api_secret: 'HiHMS5ux1bSWs4EtJMnuJwZkUGU' 
});          
const db = {};
db.sequelize = sequelize; 
module.exports=sequelize;