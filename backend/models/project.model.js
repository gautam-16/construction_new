const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const Project= sequelize.define('Project',{
  projectid:{type:Sequelize.DataTypes.INTEGER,
    autoIncrement:true,primaryKey:true},
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
  state:{type:Sequelize.DataTypes.STRING},
  city:{type:Sequelize.DataTypes.STRING},
  projectstatus:{
    type:Sequelize.STRING,
    defaultValue:"Draft"
  },
  ownername:{
    type:Sequelize.STRING,
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
    startdate:{
      type:Sequelize.DataTypes.DATEONLY,
      allowNull:false
    },
    budget:{
      type:Sequelize.DataTypes.BIGINT
    },
    estimatedcost:{type:Sequelize.DataTypes.INTEGER},
    enddate:{type:Sequelize.DataTypes.DATEONLY,allowNull:false},
    isactive:{type:Sequelize.BOOLEAN,allowNull:false,defaultValue:true},
    metadata:{
      type:Sequelize.DataTypes.STRING
    },
},{
  freezeTableName: true
},{timestamps: false});
module.exports=Project;