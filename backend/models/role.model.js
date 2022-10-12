const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTableRole= sequelize.define('Role',{
  rolename:{
    type:Sequelize.STRING,
    allowNull:false

}},{
  freezeTableName: true
});
module.exports=createTableRole;