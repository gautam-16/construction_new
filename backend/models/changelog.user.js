const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const changelogUser= sequelize.define('ChangelogUser',{
  userid:{type:Sequelize.DataTypes.INTEGER,
    autoIncrement:true,primaryKey:true},
    first_name:{
      type:Sequelize.STRING,
      allowNull:false,
    },
    last_name:{
      type:Sequelize.STRING,
      allowNull:false,
    },
  contact:{
  type:Sequelize.DataTypes.BIGINT,
  },
  alternate_contact:{
    type:Sequelize.DataTypes.BIGINT
    },
    email:{
      type:Sequelize.STRING,
      unique:true,
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
  verification_document:{
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
  updatedby:{
    type:Sequelize.INTEGER,
    allowNull:false},
    metadata:{
      type:Sequelize.DataTypes.STRING
    },
    isactive:{type:Sequelize.BOOLEAN,defaultValue:true,allowNull:false},
},{
  freezeTableName: true
});
module.exports=changelogUser;