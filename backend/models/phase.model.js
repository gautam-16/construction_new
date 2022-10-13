const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTablePhase= sequelize.define('Phase',{
  phasename:{
    type:Sequelize.STRING,
    allowNull:false},
    
    projectid:{type:Sequelize.DataTypes.INTEGER,allowNull:false},
   phaseweightage:{ type:Sequelize.DataTypes.INTEGER,
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