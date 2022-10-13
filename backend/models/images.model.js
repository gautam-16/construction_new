const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const Images= sequelize.define('Images',{
  imagedescription:{
    type:Sequelize.STRING,
  },
  imageurl:{
  type:Sequelize.DataTypes.STRING,
  allowNull:false
  },
  projectid:{
    type:Sequelize.DataTypes.INTEGER,
  },
  phaseid:{
    type:Sequelize.DataTypes.INTEGER,
  },
  userid:{
    type:Sequelize.DataTypes.INTEGER,
  }
},{
  freezeTableName: true
});
module.exports=Images;