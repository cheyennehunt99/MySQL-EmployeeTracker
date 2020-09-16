'use strict';

var cli = require("ascli")("myAppName");
var colour = require('colour');
const mysql = require('mysql');
const inquirer = require('inquirer');
const db = require('./db');
const connection = require('./db/connection');
const config = require('./package.json');
const prompts = require('./prompts');
require('console.table');

cli.banner("My employee Tracker".blue.bold);

function mainPrompt() {
    inquirer   
        .prompt(prompts.mainPrompt)
    .then((answer) => {
        switch (answer.choice) {

            case "View all departments":
                viewAllDepartments();
                break;

            case "View all roles":
                viewAllRoles()
                break;
            
            case "View all employees":
                viewAllEmployees();
                break;

            case "Add department":
                addNewDepartment();
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

async function viewAllDepartments() {

    const departments = await db.viewAllDepartments();

    console.log('/n');
    console.table(departments);

    mainPrompt();
};


async function viewAllRoles() {

    const titles = await db.viewAllRoles();

    console.log('/n');
    console.table(titles);

    mainPrompt();
};

async function viewAllEmployees() {

    const employs = await db.viewAllEmployees();

    console.log('/n');
    console.table(employs);

    mainPrompt();
};

async function addNewDepartment() { 
    inquirer.prompt(prompts.newDepartmentPrompt).then((response) => {
        connection.query(
        `
        INSERT INTO department
            (name)
        VALUES
            ('${response.newDepartmentName}');
        `
        );

        console.log("New department added successfully.")  

        return mainPrompt();
    });

};

async function addNewRole() { 
    inquirer.prompt(prompts.newRolePrompt).then((response) => {
       
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

async function addNewEmployee() { 
    inquirer.prompt(prompts.newEmployeePrompt).then((response) => {
        
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


async function updateEmployeeRole() { 
    inquirer.prompt(prompts.updateRolePrompt).then((response) => {
      
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


mainPrompt();