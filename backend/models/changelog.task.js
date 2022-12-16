const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const changelogTask= sequelize.define('changelogTask',{
  taskname:{
    type:Sequelize.STRING,
    allowNull:false
  },
  description:{
  type:Sequelize.DataTypes.TEXT,
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
      type:Sequelize.Datatypes.DATEONLY
    },
    enddate:{type:Sequelize.Datatypes.DATEONLY},
    taskstatus:{type:Sequelize.STRING},
    isactive:{type:Sequelize.BOOLEAN},
},{
  freezeTableName: true
});
module.exports=changelogTask;