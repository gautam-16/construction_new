const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const changelogProject= sequelize.define('changelogProject',{
  projectname:{
    type:Sequelize.STRING,
    
  },
  projectaddress:{
  type:Sequelize.DataTypes.STRING,
  
  },
  projectstatus:{
    type:Sequelize.STRING,
  },
  projectowner:{
    type:Sequelize.STRING,
  
  },
  projectmanager:
  {type:Sequelize.DataTypes.STRING},
  principlearchitect:
  {type:Sequelize.DataTypes.STRING},

  projectownercontact:{
    type:Sequelize.DataTypes.BIGINT,
    
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
module.exports=changelogProject;