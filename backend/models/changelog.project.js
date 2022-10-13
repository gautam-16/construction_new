const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const changelogProject= sequelize.define('changelogProject',{
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
  projectmanager:
  {type:Sequelize.DataTypes.STRING},
  principlearchitect:
  {type:Sequelize.DataTypes.STRING},

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
    isactive:{type:Sequelize.BOOLEAN,allowNull:false,defaultValue:true},
},{
  freezeTableName: true
});
module.exports=changelogProject;