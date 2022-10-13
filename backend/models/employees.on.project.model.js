const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')
const EmployeesOnProject= sequelize.define('EmployeesOnProject',{
  userid:{
    type:Sequelize.DataTypes.INTEGER,
    allowNull:false
  },
  projectid:{
  type:Sequelize.DataTypes.INTEGER,
  allowNull:false
  },
  metadata:{
    type:Sequelize.DataTypes.INTEGER
  }
},{
  freezeTableName: true
});
module.exports=EmployeesOnProject;