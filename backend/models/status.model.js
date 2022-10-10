const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')

const createTableStatus= sequelize.define('Status',{
  statuscode:{
    type:Sequelize.STRING,
    metadata:{
      type:Sequelize.DataTypes.STRING
    },
    statusname:{
        type:Sequelize.STRING
    }

}},{
  freezeTableName: true
});
module.exports= createTableStatus;