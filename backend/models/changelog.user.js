const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const changelogUser= sequelize.define('ChangelogUser',{
  userid:{type:Sequelize.DataTypes.INTEGER},
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
  isactive:{type:Sequelize.BOOLEAN,defaultValue:true,allowNull:false},
  updatedby:{
    type:Sequelize.INTEGER,
    allowNull:false},
    metadata:{
      type:Sequelize.DataTypes.STRING
    },
},{
  freezeTableName: true
});
module.exports=changelogUser;