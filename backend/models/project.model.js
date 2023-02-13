const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const Project= sequelize.define('Project',{
  projectname:{
    type:Sequelize.STRING,
    allowNull:false,
    unique:true
  },
  projectaddress:{
  type:Sequelize.DataTypes.STRING,
  allowNull:false,
  unique:true
  },
  location:{type:Sequelize.DataTypes.STRING},
  city:{type:Sequelize.DataTypes.STRING},
  projectstatus:{
    type:Sequelize.STRING,
    defaultValue:"Ontrack"
  },
  owner:{
    type:Sequelize.STRING,
    allowNull:false
  },
  projectmanager:
  {type:Sequelize.DataTypes.STRING},
  principalarchitect:
  {type:Sequelize.DataTypes.STRING},
  ownercontact:{
    type:Sequelize.DataTypes.BIGINT,
    allowNull:false
  },
  owneremail:{
    type:Sequelize.STRING,
    validate:{isEmail:true},
    defaultValue:null
  }, 
  createdbyadmin:{
    type:Sequelize.DataTypes.INTEGER,
    required:true},
    metadata:{
      type:Sequelize.DataTypes.STRING
    },
    startdate:{
      type:Sequelize.DataTypes.DATEONLY,
      allowNull:false
    },
    estimatedcost:{type:Sequelize.DataTypes.INTEGER},
    enddate:{type:Sequelize.DataTypes.DATEONLY,allowNull:false},
    isactive:{type:Sequelize.BOOLEAN,allowNull:false,defaultValue:true},
},{
  freezeTableName: true
},{timestamps: false});
module.exports=Project;