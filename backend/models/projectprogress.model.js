const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTableProjectProgress= sequelize.define('ProjectProgress',{
  progress:{
    type:Sequelize.DataTypes.INTEGER,
  },
 
  projectid:{
    type:Sequelize.DataTypes.INTEGER,
    allowNull:false
  },
  phaseid:{
    type:Sequelize.DataTypes.INTEGER,
    allowNull:false
  },
 
},{
  freezeTableName: true
});
module.exports=createTableProjectProgress;