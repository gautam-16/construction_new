const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTablePhase= sequelize.define('Phase',{
  phasename:{
    type:Sequelize.STRING,
    allowNull:false},
    
    projectid:{type:Sequelize.STRING,allowNull:false},
   phaseweightage:{ type:Sequelize.STRING,
    allowNull:false},
    phasestartdate:{
      type:Sequelize.DATEONLY
    }, phaseenddate:{
      type:Sequelize.DATEONLY
    },
    phasestatus:{type:Sequelize.STRING},
    isactive:{type:Sequelize.BOOLEAN},

    metadata:{
      type:Sequelize.DataTypes.STRING
    },
},{
  freezeTableName: true
});
module.exports=createTablePhase;