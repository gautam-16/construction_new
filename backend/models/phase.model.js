const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTablePhase= sequelize.define('Phase',{
  phasename:{
    type:Sequelize.STRING,
    required:[true,'cannot create phase without name']},
    
    projectid:{type:Sequelize.STRING,
    required:[true,'cannot create phase without projectid']},
   phaseweightage:{ type:Sequelize.STRING,
    required:[true,'cannot create user without name']},
    phasestartdate:{
      type:Sequelize.DATEONLY
    }, phaseenddate:{
      type:Sequelize.DATEONLY
    },

    metadata:{
      type:Sequelize.DataTypes.STRING
    },
},{
  freezeTableName: true
});
module.exports=createTablePhase;