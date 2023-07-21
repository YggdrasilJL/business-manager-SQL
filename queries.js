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

async function addRoleQ() {
    await inquirer
        .prompt([
            {
                type: 'input',
                messsage: "What is the role?",
                name: 'roleName'
            },
            {
                type: 'input',
                message: 'What is the salary for said role?',
                name: 'salary'
            }
        ])
        .then(async data => {
            await connection.promise().query(
                `insert into role (title, salary) values ('${data.roleName}','${data.salary}')`
            )
        console.info(data.roleName, 'role added')
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

async function addDepartmentQ() {
    await inquirer
        .prompt(
            {
                type: 'input',
                message: 'What is the name of the department you want to add?',
                name: 'addDepartment'
            }
        )
        .then(async departmentName => {
            await connection.promise().query(
                `insert into department (name) value ('${departmentName.addDepartment}')`
            )
            console.info(departmentName.addDepartment, 'department added.')
        })
}

module.exports = { viewEmployeesQ, viewRolesQ, viewDepartmentsQ, addEmployeeQ,
     updateRoleQ, addDepartmentQ, addRoleQ }
