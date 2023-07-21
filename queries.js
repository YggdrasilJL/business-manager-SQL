const mysql = require('mysql2')
const connection = require('./db.js')
const inquirer = require('inquirer')


async function viewEmployeesQ() {
    // needs fields even if not called, or it tables the whole object
    const [rows, fields] = await connection.promise().query(
        'select * from employee',
    )
    console.table(rows)
}


async function viewRolesQ() {
    const [rows, fields] = await connection.promise().query(
        'select * from role'
    )
    console.table(rows)
}

async function viewDepartmentsQ() {
    const [rows, fields] = await connection.promise().query(
        'select * from department'
    )
    console.table(rows)
}

async function addEmployeeQ() {
    await inquirer
        .prompt([
            {
                type: 'input',
                messsage: "What is the employee's first name?",
                name: 'firstName'
            },
            {
                type: 'input',
                message: 'Last name?',
                name: 'lastName'
            }
        ])
        .then(async data => {
            const [rows, fields] = await connection.promise().query(
                `insert into employee (first_name, last_name) values ('${data.firstName}', '${data.lastName}')`
            )
            console.info(data.firstName, 'added!')
        })
}

async function updateRoleQ() {
    const [employees, fields] = await connection.promise().query(
        'select * from employee',
    )
    const employeeChoices = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
    }))
    await inquirer
        .prompt([
            {
                type: 'list',
                message: 'Select the employee you want to update the role of:',
                choices: employeeChoices,
                name: 'chooseEmployee'
            }
        ])
        .then(async data => {
            console.log(data)
        })
}

async function addDepartment() {
    inquirer
    .prompt(
        {
            type: 'input',
            message: ''
        }
    )
    const [rows, fields] = await connection.promise().query(

    )    
}

module.exports = { viewEmployeesQ, viewRolesQ, viewDepartmentsQ, addEmployeeQ, updateRoleQ }
