const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTableUser= sequelize.define('User',{
  name:{
    type:Sequelize.STRING,
    allowNull:false,
  },
  contact:{
  type:Sequelize.DataTypes.BIGINT,
  allowNull:false
  },
  email:{
    type:Sequelize.STRING,
    primaryKey:true,
    validate:{isEmail:true},
    allowNull:false
  },
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
    },
    isactive:{type:Sequelize.BOOLEAN}
},{
  freezeTableName: true
});
module.exports=createTableUser;