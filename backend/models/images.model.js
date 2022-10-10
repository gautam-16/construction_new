const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTableImages= sequelize.define('Images',{
  imagedescription:{
    type:Sequelize.STRING,
  },
  imageurl:{
  type:Sequelize.DataTypes.STRING,
  required:true
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