const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTableProjectProgress= sequelize.define('ProjectProgress',{
  progress:{
    type:Sequelize.MEDIUMINT,
  },
 
  projectid:{
    type:Sequelize.STRING,
  },
  phaseid:{
    type:Sequelize.STRING,
  },
 
},{
  freezeTableName: true
});
module.exports=createTableProjectProgress;