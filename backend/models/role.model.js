const {Sequelize,DataTypes, ARRAY}=require('sequelize')
const sequelize=require('../server')

const Role= sequelize.define('Role',{
  rolename:{
    type:Sequelize.STRING,
    allowNull:false

},
level:{
  type:Sequelize.DataTypes.INTEGER,
  allowNull:false
}
},
{
  freezeTableName: true
});
module.exports=Role;