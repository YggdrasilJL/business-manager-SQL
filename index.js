const inquirer = require('inquirer')
const mysql = require('mysql2')

inquirer
.prompt(
    {
       type: 'list',
       choices: ['View all employees', 'Add an employee', 'Update employee role', 'View all roles',
    'Add a role', 'View all departments', 'Add department', 'Quit']
    })