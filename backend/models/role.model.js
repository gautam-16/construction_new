const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTableRole= sequelize.define('Role',{
  rolename:{
    type:Sequelize.STRING,
    required:[true,'cannot create Role without name']

}},{
  freezeTableName: true
});
module.exports=createTableRole;