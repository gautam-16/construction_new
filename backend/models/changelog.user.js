const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const changelogUser= sequelize.define('ChangelogUser',{
  userid:{type:Sequelize.DataTypes.INTEGER},
  name:{
    type:Sequelize.STRING,
    allowNull:false,
  },
  contact:{
  type:Sequelize.DataTypes.BIGINT,
  },
  email:{
    type:Sequelize.STRING},
  password:{
    type:Sequelize.STRING,
    allowNull:false},
  address:{
    type:Sequelize.STRING,
    default:null
  },
  verficiation_document:{
    type:Sequelize.STRING,
    default:null
  },
  profile_image:{
    type:Sequelize.STRING,
    default:null
  }, 
  created_by:{
    type:Sequelize.INTEGER,
    allowNull:false},
  level:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  designation:{
    type:Sequelize.STRING,
    allowNull:false},
    metadata:{
      type:Sequelize.DataTypes.STRING
    },
    userstatus:{
      type:Sequelize.STRING,
      defaultValue:"Active"
    },
    isactive:{type:Sequelize.BOOLEAN,defaultValue:true,allowNull:false},
    updatedby:{
      type:Sequelize.DataTypes.INTEGER
    }
},{
  freezeTableName: true
});
module.exports=changelogUser;