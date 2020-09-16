const inquirer = require('inquirer');
module.exports = {
    mainPrompt: [{
    type: "list",
    message: `What would you like to do?`,
    name: "choice",
    choices: 
    [
    "View all departments",
    "View all roles",
    "View all employees",
    "Add department",
    "Add role",
    "Add employee",
    "Update employee role",
    "Quit"
    ]
}],

newDepartmentPrompt:
    {
    type: "input",
    message: `Input a new department name.`,
    name: "newDepartmentName",
    },

newRolePrompt: [
    {
    type: "input",
    message: `Input a new role title.`,
    name: "newRoleTitle",
    }, 
    {
        type: "input",
        message: `Input the salary of the new role.`,
        name: "newRoleSalary",
    },
    {
        type: "input",
        message: `Input the department ID of the new role.`,
        name: "newRoleID",
    }
],

newEmployeePrompt: [
    {
    type: "input",
    message: `Input the employee's first name.`,
    name: "employeeName",
    }, 
    {
    type: "input",
    message: `Input the employee's last name.`,
    name: "employeeLastName",
    }, 
    {
    type: "input",
    message: `Input the role ID of the employee.`,
    name: "employeeRoleID",
    },
    {
    type: "input",
    message: `Input the ID of the employee's manager.`,
    name: "employeeManagerID",
    }
    ],

    updateRolePrompt: [
        {
        type: "input",
        message: `Input the employee's ID whose role ID you wish to edit.`,
        name: "chosenID",
        }, 
        {
        type: "input",
        message: `Input the employee's new role ID.`,
        name: "updatedRoleID",
        }, 
        ],



};