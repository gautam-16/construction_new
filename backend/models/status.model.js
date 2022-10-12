const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTableStatus= sequelize.define('Status',{
  statusname:{
    type:Sequelize.STRING
},
    metadata:{
      type:Sequelize.DataTypes.STRING
    }
},{
  freezeTableName: true
});
module.exports= createTableStatus;