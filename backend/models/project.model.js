const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTableProject= sequelize.define('Project',{
  projectName:{
    type:Sequelize.STRING,
    required:[true,'cannot create project without name']
  },
  projectAddress:{
  type:Sequelize.DataTypes.STRING,
  required:[true,'cannot create project without address']
  },
  projectStatus:{
    type:Sequelize.STRING,
  },
  projectOwner:{
    type:Sequelize.STRING,
    required:[true,'cannot create user without entering password']
  },
  projectOwnerContact:{
    type:Sequelize.DataTypes.STRING,
    required:[true,'cannot create user without entering password']
  },
  projectOwnerEmail:{
    type:Sequelize.STRING,
    default:null
  }, 
  createdByAdmin:{
    type:Sequelize.STRING,
    required:true},
    metadata:{
      type:Sequelize.DataTypes.STRING
    },
    startdate:{
      type:Sequelize.DATEONLY
    },
    enddate:{type:Sequelize.DATEONLY}
},{
  freezeTableName: true
});
module.exports=createTableProject;