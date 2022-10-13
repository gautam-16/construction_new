const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTableProject= sequelize.define('Project',{
  projectname:{
    type:Sequelize.STRING,
    allowNull:false
  },
  projectaddress:{
  type:Sequelize.DataTypes.STRING,
  allowNull:false
  },
  projectstatus:{
    type:Sequelize.STRING,
  },
  projectowner:{
    type:Sequelize.STRING,
    allowNull:false
  },
  projectownercontact:{
    type:Sequelize.DataTypes.BIGINT,
    allowNull:false
  },
  projectowneremail:{
    type:Sequelize.STRING,
    default:null
  }, 
  createdbyadmin:{
    type:Sequelize.DataTypes.INTEGER,
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