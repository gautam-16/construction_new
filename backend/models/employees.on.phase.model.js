const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')
const EmployeesOnPhase= sequelize.define('EmployeesOnPhase',{
  userid:{
    type:Sequelize.DataTypes.INTEGER,
    allowNull:false
  },
  nameofuser:{type:Sequelize.DataTypes.STRING},
  phaseid:{
  type:Sequelize.DataTypes.INTEGER,
  allowNull:false
  },
  projectname:{type:Sequelize.DataTypes.STRING,
    allowNull:false},
  employeestatusphase:{
    type:Sequelize.DataTypes.STRING,
  allowNull:false
  },
  employeeprogress:{ type:Sequelize.DataTypes.INTEGER,
    allowNull:false,
    defaultValue:'0'
  },
  assignedonphaseby:{type:Sequelize.DataTypes.STRING},
  metadata:{
    type:Sequelize.DataTypes.INTEGER
  },
},{
  freezeTableName: true
},{timestamps: false});
module.exports=EmployeesOnPhase;