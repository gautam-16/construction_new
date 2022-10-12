const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTableUser= sequelize.define('User',{
  name:{
    type:Sequelize.STRING,
    required:[true,'cannot create user without name']
  },
  contact:{
  type:Sequelize.DataTypes.BIGINT,
  required:[true,'cannot create user without contact']
  },
  email:{
    type:Sequelize.STRING,
    primaryKey:true,
    required:[true,'cannot create user without email'],
    validate:{isEmail:true}
  },
  password:{
    type:Sequelize.STRING,
    required:[true,'cannot create user without entering password']
  },
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
    required:true},
  role:{
    type:Sequelize.STRING,
    required:[true,'role must be defined.']
  },
  designation:{
    type:Sequelize.STRING,
    required:[true,'user designation, must be defined']},
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