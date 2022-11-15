const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const PhaseProgress= sequelize.define('PhaseProgress',{
  progress:{
    type:Sequelize.DataTypes.INTEGER,
  },
  phaseid:{
    type:Sequelize.DataTypes.INTEGER,
    allowNull:false
  },
},{
  freezeTableName: true
});
module.exports=PhaseProgress;