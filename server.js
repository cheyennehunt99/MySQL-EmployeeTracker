'use strict';

const inquirer = require('inquirer');

const prompts = require('./prompts')
const db = require('./db');
require('console.table');





async function mainPrompt() {

    const { choice } = await inquirer.prompt(prompts.mainPrompt);

    switch (choice) {
        case 'View_Departments':
            return viewAllDepartments();
        case 'Add_Department':
            return addDepartment();
        case 'View_Roles':
            return viewAllRoles();
        case 'Add_Role':
            return addRole();
        case 'View_Employees':
            return viewAllEmployees();
        case 'Add_Employee':
            return addEmployee();
        case 'Update_Employee_Role':
            return updateEmployeeRole();
        case 'Quit':
            return quit();
        default:
            return quit();
    };
};

async function viewAllDepartments() {

    const departments = await db.viewAllDepartments();

    console.log('\n');
    console.table(departments);

    mainPrompt();
};

async function viewAllRoles() {

    const roles = await db.viewAllRoles();

    console.log('\n');
    console.table(roles);

    mainPrompt();
};


async function viewAllEmployees() {

    const employees = await db.viewAllEmployees();

    console.log('\n');
    console.table(employees);

    mainPrompt();
};


async function addDepartment() {

    const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the Department?'
        }
    ]);

    await db.createDepartment(department);

    console.log('New Department created!');

    mainPrompt();
}

async function addRole() {

    const department = await db.viewAllDepartments();

    const departmentChoices = department.map(({ id, name }) => ({
        name: name,
        value: id
    }));

    const role = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'what is the salary of the role?'
        },
        {
            type: 'list',
            name: 'house_id',
            message: 'To which department do you belong?',
            choices: departmentChoices
        }
    ]);


    await db.createRole(role);

    console.log(`Added ${role.name} to the database`);

    mainPrompt();
}

async function addEmployee() {

    const roles = await db.viewAllRoles();
    const employees = await db.viewAllEmployees();

    const employee = await inquirer.prompt(prompts.addEmployee)

    const roleChoices = roles.map(({ id, Role }) => ({
        name: Role,
        value: id
    }));

    const { roleId } = await inquirer.prompt({
        type: 'list',
        name: 'roleId',
        message: 'What is your employees role?',
        choices: roleChoices
    })

    employee.role_id = roleId;

    const managerChoices = employees.map(({ Id, First_Name, Last_Name }) => ({
        name: `${First_Name} ${Last_Name}`,
        value: Id
    }));
    managerChoices.unshift({ name: 'None', value: null });

    const { managerId } = await inquirer.prompt({
        type: 'list',
        name: 'managerId',
        message: 'Who is your employees manager?',
        choices: managerChoices
    });

    employee.manager_id = managerId;

    await db.createEmployee(employee);
    console.log(
        `Added ${employee.First_Name} ${employee.Last_Name} to the board`
    );

    mainPrompt();
}

async function updateEmployeeRole() {

    const employees = await db.viewAllEmployees();

    const employeeChoices = employees.map(({ Id, First_Name, Last_Name }) => ({
        name: `${First_Name} ${Last_Name}`,
        value: Id
    }));

    const { characterId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Which employees role do you want to update?',
            choices: employeeChoices
        }
    ]);

    const role = await db.viewAllRoles();

    const roleChoices = roles.map(({ id, Rolee }) => ({
        name: Role,
        value: id
    }));

    const { roleId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'roleId',
            message: 'Which role do you want to assign to the selected employee?',
            choices: roleChoices
        }
    ]);

    await db.updateEmployeeRole(roleId, employeeId);

    console.log(`Updated employees role`);

    mainPrompt();

}

async function quit() {

    console.log('Goodbye!');
    process.exit();
}

init();