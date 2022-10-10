const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')
const createTableEmployeesOnProject= sequelize.define('EmployeesOnProject',{
  userid:{
    type:Sequelize.DataTypes.STRING,
    required:[true,'cannot create table without employee ID']
  },
  projectid:{
  type:Sequelize.DataTypes.STRING,
  required:[true,'cannot create table without projectID']
  },
  metadata:{
    type:Sequelize.DataTypes.STRING
  }
},{
  freezeTableName: true
});
module.exports=createTableEmployeesOnProject;