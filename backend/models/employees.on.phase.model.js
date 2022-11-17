const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')
const EmployeesOnPhase= sequelize.define('EmployeesOnPhase',{
  userid:{
    type:Sequelize.DataTypes.INTEGER,
    allowNull:false
  },
  designation:{type:Sequelize.DataTypes.STRING},
  nameofuser:{type:Sequelize.DataTypes.STRING},
  phasename:{
  type:Sequelize.DataTypes.STRING,
  allowNull:false
  },
  employeestatusphase:{
    type:Sequelize.DataTypes.STRING,
  allowNull:false
  },
  assignedbyphase:{type:Sequelize.DataTypes.STRING},
  metadata:{
    type:Sequelize.DataTypes.INTEGER
  },
  employeeprogress:{ type:Sequelize.DataTypes.INTEGER,
    allowNull:false,
    defaultValue:'0'
  },
},{
  freezeTableName: true
});
module.exports=EmployeesOnPhase;