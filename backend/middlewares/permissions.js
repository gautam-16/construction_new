const User=require('../models/user.model')
const EmployeesOnProject=require('../models/employees.on.project.model')
const obj= {
    "Create Role": 1,
    "Read Role": 2,
    "Update Role": 3,
    "Delete Role": 4,
    "Create User": 5,
    "Read One User": 6,
    "Update One User": 7,
    "Delete One User": 8,
    "Login User": 9,
    "Get Role": 10,
    "Change Password": 11,
    "Forgot Password": 12,
    "Get All Users Details": 13,
    "Update Own Details": 14,
    "Create Project": 15,
    "Get All Projects": 16,
    "Get One Project": 17,
    "Update Project": 18,
    "Delete Project": 19,
    "Assign Employee On Project": 20,
    "Get All Employees Deployed On Project": 21,
    "All Employees On Project": 22,
    "Removed Employees On Project": 23,
    "Remove Employees On Project": 24,
    "Reassign Employee On Project": 25,
    "Create Phase": 26,
    "Get Phase By Id": 27,
    "Update One Phase": 28,
    "Assign Employee On Phase": 29,
    "Get All Employees On All Phases": 30,
    "Delete Employee From Phase": 31,
    "Reassign Employee To Phase": 32,
    "Create Task": 33,
    "Get One Task": 34,
    "Update Task Progress": 35,
    "Update Task ": 36,
    "Delete Task": 37,
    "Remove Employee From Task": 38,
    "Reassign Employee To Task": 39,
    "Get All Tasks": 40
}
const arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,
    17,18,19,20,21,22,23,24,
    25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]

exports.PermissionAccess=async(req,res,next)=>{
    try {
        const employee=await EmployeesOnProject.findOne({where:{id:req.body.id}})
        console.log(employee,obj)

        
    } catch (error) {
        
    }
}