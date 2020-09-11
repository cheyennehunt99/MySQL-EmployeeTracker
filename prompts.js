module.exports = {

    mainPrompt: [
        {
            type: "list",
            name: 'choice',
            message: "What would you like to do?",
            choices: [
            {
                name: 'View All Departments',
                value: 'View_Departments'
            },
            {
                name: 'Add Department',
                value: 'Add_Department'
            },
            {
                name: 'View All Roles',
                value: 'View_Roles'
            },
            {
                name: 'Add Role',
                value: 'Add_Role'
            },
            {
                name: 'View All Employees',
                value: 'View_Employees'
            },
            {
                name: 'Add Employee',
                value: 'Add_Employee',
            },
            {
             
                name: 'Quit',
                value: 'Quit',
            }
        ]
    }
],

updateEmployee: [
    {
        type: 'input',
        name: 'first_Name',
        message: 'What is your employees first name?',
    },
    {
        type: 'input',
        name: 'last_Name',
        message: 'What is your employees last name?',
    },
  ],
}