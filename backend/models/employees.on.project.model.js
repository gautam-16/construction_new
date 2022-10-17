const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')
const EmployeesOnProject= sequelize.define('EmployeesOnProject',{
  userid:{
    type:Sequelize.DataTypes.INTEGER,
    allowNull:false
  },
  userdesignation:{type:Sequelize.DataTypes.STRING},
  projectname:{
  type:Sequelize.DataTypes.STRING,
  allowNull:false
  },
  assignedby:{type:Sequelize.DataTypes.STRING},
  metadata:{
    type:Sequelize.DataTypes.INTEGER
  }
},{
  freezeTableName: true
});
module.exports=EmployeesOnProject;