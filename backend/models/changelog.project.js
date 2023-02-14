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
 
  projectowneremail:{
    type:Sequelize.STRING,
    default:null
  }, 
  projectownercontact:{
    type:Sequelize.DataTypes.BIGINT,
    
  },
  createdbyadmin:{
    type:Sequelize.DataTypes.INTEGER,
    required:true},
    startdate:{
      type:Sequelize.DATEONLY
    },
    enddate:{
      type:Sequelize.DATEONLY
    },
    budget:{
      type:Sequelize.DataTypes.BIGINT
    },
    estimatedcost:{
      type:Sequelize.DataTypes.BIGINT
    },
    isactive:{type:Sequelize.BOOLEAN},
    metadata:{
      type:Sequelize.DataTypes.STRING
    }
  },{
  freezeTableName: true
});
module.exports=changelogProject;
