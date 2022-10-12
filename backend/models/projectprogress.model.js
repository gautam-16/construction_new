const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTableProjectProgress= sequelize.define('ProjectProgress',{
  progress:{
    type:Sequelize.DataTypes.INTEGER,
  },
 
  projectid:{
    type:Sequelize.STRING,
    allowNull:false
  },
  phaseid:{
    type:Sequelize.STRING,
    allowNull:false
  },
 
},{
  freezeTableName: true
});
module.exports=createTableProjectProgress;