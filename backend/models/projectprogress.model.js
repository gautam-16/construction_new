const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const ProjectProgress= sequelize.define('ProjectProgress',{
  projectid:{
    type:Sequelize.DataTypes.INTEGER
  },
  projectprogress:{
    type:Sequelize.DataTypes.INTEGER,
  },
  totalphases:{
    type:Sequelize.DataTypes.INTEGER,
    allowNull:false
  },
  completephases:{
    type:Sequelize.DataTypes.INTEGER,
    defaultValue:0
  },
},{
  freezeTableName: true
},{timestamps: false});
module.exports=ProjectProgress;