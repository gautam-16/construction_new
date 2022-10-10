const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTableProject= sequelize.define('Project',{
  projectname:{
    type:Sequelize.STRING,
    required:[true,'cannot create project without name']
  },
  projectaddress:{
  type:Sequelize.DataTypes.STRING,
  required:[true,'cannot create project without address']
  },
  projectstatus:{
    type:Sequelize.STRING,
  },
  projectowner:{
    type:Sequelize.STRING,
    required:[true,'cannot create user without entering password']
  },
  projectownercontact:{
    type:Sequelize.DataTypes.STRING,
    required:[true,'cannot create user without entering password']
  },
  projectowneremail:{
    type:Sequelize.STRING,
    default:null
  }, 
  createdbyadmin:{
    type:Sequelize.STRING,
    required:true},
    metadata:{
      type:Sequelize.DataTypes.STRING
    },
    startdate:{
      type:Sequelize.DATEONLY
    },
    enddate:{type:Sequelize.DATEONLY},
    isactive:{type:Sequelize.BOOLEAN},
},{
  freezeTableName: true
});
module.exports=createTableProject;