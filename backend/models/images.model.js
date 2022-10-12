const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTableImages= sequelize.define('Images',{
  imagedescription:{
    type:Sequelize.STRING,
  },
  imageurl:{
  type:Sequelize.DataTypes.STRING,
  allowNull:false
  },
  projectid:{
    type:Sequelize.STRING,
  },
  phaseid:{
    type:Sequelize.STRING,
  },
  userid:{
    type:Sequelize.DataTypes.STRING,
  }
},{
  freezeTableName: true
});
module.exports=createTableImages;