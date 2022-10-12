const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')
const createTableEmployeesOnProject= sequelize.define('EmployeesOnProject',{
  userid:{
    type:Sequelize.DataTypes.STRING,
    allowNull:false
  },
  projectid:{
  type:Sequelize.DataTypes.STRING,
  allowNull:false
  },
  metadata:{
    type:Sequelize.DataTypes.STRING
  }
},{
  freezeTableName: true
});
module.exports=createTableEmployeesOnProject;