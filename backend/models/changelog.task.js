const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const changelogTask= sequelize.define('changelogTask',{
  taskname:{
    type:Sequelize.STRING,
    allowNull:false
  },
  description:{
  type:Sequelize.DataTypes.STRING,
  },
  taskassignedby:{
    type:Sequelize.DataTypes.INTEGER,
    required:true
  },
  taskassignedto:{
    type:Sequelize.DataTypes.INTEGER,
    required:true},
    metadata:{
      type:Sequelize.DataTypes.STRING
    },
    updatedby:{
        type:Sequelize.DataTypes.INTEGER,
        required:true
    },
    phaseid:{type:Sequelize.DataTypes.INTEGER},
    startdate:{
      type:Sequelize.DATEONLY
    },
    enddate:{type:Sequelize.DATEONLY},
    taskstatus:{type:Sequelize.STRING},
    isactive:{type:Sequelize.BOOLEAN},
},{
  freezeTableName: true
});
module.exports=changelogTask;