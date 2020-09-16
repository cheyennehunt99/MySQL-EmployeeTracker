'use strict';

const inquirer = require('inquirer');
const connection = require('./db/connection');
const mysql = require('mysql');
const config = require('./package.json');
const prompts = require('./prompts');
const db = require('./db');
require('console.table');


function mainPrompt() {
    inquirer   
        .prompt(prompts.mainPrompt)
    .then((answer) => {
        switch (answer.choice) {

            case "View all departments":
                viewAllDept();
                break;

            case "View all roles":
                viewAllRoles()
                break;
            
            case "View all employees":
                viewAllEmployees();
                break;
    
            case "Add role":
                addNewRole();
                break;

            case "Add employee":
                addNewEmployee();
                break;
    
             case "Update employee role":
                updateEmployeeRole();
                break;
    
             case "Quit":
                return
                break;
        }
    });
};

// The function to view all departments
async function viewAllDept() {

    const depts = await db.viewAllDept();

    console.log('/n');
    console.table(depts);

    mainPrompt();
};

// The function that displays all the employee titles (roles)
async function viewAllRoles() {

    const titles = await db.viewAllRoles();

    console.log('/n');
    console.table(titles);

    mainPrompt();
};

// The function to view all employees
async function viewAllEmployees() {

    const employs = await db.viewAllEmployees();

    console.log('/n');
    console.table(employs);

    mainPrompt();
};

// Function to add a new department
async function addNewDept() { 
    inquirer.prompt(prompts.newDeptPrompt).then((response) => {
        // Store the responses in a variable then add them to the db as a new department
        connection.query(
        `
        INSERT INTO department
            (name)
        VALUES
            ('${response.newDeptName}');
        `
        );

        console.log("New department added successfully.")  

        return mainPrompt();
    });

};

// The function to add a new role
async function addNewRole() { 
    inquirer.prompt(prompts.newRolePrompt).then((response) => {
        // Store the responses in a variable then add them to the db as a new role
        connection.query(
        `
        INSERT INTO role
            (title, salary, department_id)
        VALUES
            ('${response.newRoleTitle}', ${response.newRoleSalary}, ${response.newRoleID});
        `
        );

        console.log("New role added successfully.")  

        return mainPrompt();
    });

};

// Function to add a new employee
async function addNewEmployee() { 
    inquirer.prompt(prompts.newEmployeePrompt).then((response) => {
        // Store the responses in a variable then add them to the db as a new employee
        connection.query(
        `
        INSERT INTO employee
            (first_name, last_name, role_id, manager_id)
        VALUES
            ('${response.employeeName}', '${response.employeeLastName}', '${response.employeeRoleID}', '${response.employeeManagerID}');
        `
        );

        console.log("New employee added successfully.")  

        return mainPrompt();
    });

};

// Function to update an employee's role ID
async function updateEmployeeRole() { 
    inquirer.prompt(prompts.updateRolePrompt).then((response) => {
        // Store the responses in a variable then use them to update a role ID for the chosen employee ID
        connection.query(
        `
        UPDATE employee
        SET role_id = '${response.updatedRoleID}'
        WHERE employee.id = '${response.chosenID}';
        `
        );

        console.log("Employee's role has been updated.")  

        return mainPrompt();
    });

};

// A switch function that chooses what to do next based on inquirer selections, all functions will then update or display the db as indicated and then call back the mainPrompt()


mainPrompt();