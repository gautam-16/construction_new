const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTableTask= sequelize.define('Task',{
  Taskname:{
    type:Sequelize.STRING,
    required:[true,'cannot create Task without name']
  },
  description:{
  type:Sequelize.DataTypes.STRING,
  },
  taskassignedby:{
    type:Sequelize.STRING,
    required:true
  },
  taskassignedto:{
    type:Sequelize.STRING,
    required:true},
    metadata:{
      type:Sequelize.DataTypes.STRING
    },
    project:{type:Sequelize.STRING},
    startdate:{
      type:Sequelize.DATEONLY
    },
    enddate:{type:Sequelize.DATEONLY}
},{
  freezeTableName: true
});
module.exports=createTableTask;