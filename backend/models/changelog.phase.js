const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const changelogPhase= sequelize.define('changelogPhase',{
    phaseid:{type:Sequelize.INTEGER,allowNull:false},
    phasename:{
    type:Sequelize.STRING,
    allowNull:false},
    
    projectname:{type:Sequelize.DataTypes.STRING,allowNull:false},

    phaseweightage:{ type:Sequelize.DataTypes.INTEGER,
    allowNull:false},

    phasestartdate:{
      type:Sequelize.DATEONLY 
    },
    phaseenddate:{
      type:Sequelize.DATEONLY
    },
    phasestatus:{type:Sequelize.STRING},
    isactive:{type:Sequelize.BOOLEAN,defaultValue:true},
    createdbyadmin:{
      type:Sequelize.DataTypes.INTEGER,
      allowNull:false},
      metadata:{
        type:Sequelize.DataTypes.STRING
      },
      updatedbybyadmin:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false},
    metadata:{
      type:Sequelize.DataTypes.STRING
    },
},{
  freezeTableName: true
});
module.exports=changelogPhase;