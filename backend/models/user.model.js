const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const User= sequelize.define('User',{
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
  allowNull:false
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
    type:Sequelize.DataTypes.,
    default:null
  }, 
  created_by:{
    type:Sequelize.INTEGER,
    allowNull:false},
  level:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
    isactive:{type:Sequelize.BOOLEAN,defaultValue:true,allowNull:false},
    updatedby:{
      type:Sequelize.DataTypes.INTEGER
    }
},{
  freezeTableName: true
},{timestamps: false});
module.exports=User;