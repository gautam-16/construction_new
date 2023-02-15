const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const Images= sequelize.define('Images',{
  imagedescription:{
    type:Sequelize.STRING,
  },
  imageurl:{
  type:Sequelize.DataTypes.TEXT,
  allowNull:false
  },
  projectid:{
    type:Sequelize.DataTypes.INTEGER,
  },
  phaseid:{
    type:Sequelize.DataTypes.INTEGER,
  },
  employeeid:{
    type:Sequelize.DataTypes.INTEGER,
  },
  metadata:{
    type:Sequelize.DataTypes.STRING
  }
},{
  freezeTableName: true
},{timestamps: false});
module.exports=Images;