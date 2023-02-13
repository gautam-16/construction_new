const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../server')
const EmployeesOnProject= sequelize.define('EmployeesOnProject',{
  employee_id:{type:Sequelize.DataTypes.INTEGER,allowNull:false,primaryKey:true,autoIncrement:true},
  level:{type:Sequelize.DataTypes.INTEGER,allowNull:false},
  permissions:{type:Sequelize.DataTypes.ARRAY(DataTypes.INTEGER)},
  role:{type:Sequelize.DataTypes.STRING},
  first_name:{type:Sequelize.DataTypes.STRING},
  last_name:{type:Sequelize.DataTypes.STRING},
  contact:{type:Sequelize.DataTypes.BIGINT,allowNull:false},
  alternate_contact:{type:Sequelize.DataTypes.BIGINT},
  projectname:{type:Sequelize.DataTypes.STRING,allowNull:false},
  deployment_status:{type:Sequelize.DataTypes.BOOLEAN,allowNull:false},
  isactive:{type:Sequelize.DataTypes.BOOLEAN,allowNull:false},
  assignedby:{type:Sequelize.DataTypes.STRING},
  reporting_to:{type:Sequelize.DataTypes.STRING},
  verification_document:{type:Sequelize.STRING,default:null},
  metadata:{type:Sequelize.DataTypes.INTEGER}
},{
  freezeTableName: true
},{timestamps: false});
module.exports=EmployeesOnProject;