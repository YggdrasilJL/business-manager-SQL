const mysql = require('mysql2')
const connection = require('./db/db.js')
const inquirer = require('inquirer')

async function viewEmployeesQ() {
    const [rows, fields] =
        await connection.promise().query(
        // uppercase mysql commands to make it look more readable in vscode
            `SELECT 
        emp.id AS employee_id,
        emp.first_name,
        emp.last_name,
        rl.title AS job_title,
        dep.department_name AS department,
        rl.salary,
        CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager
     FROM employee emp
     LEFT JOIN role rl ON emp.role_id = rl.id
     LEFT JOIN department dep ON rl.department_id = dep.id
     LEFT JOIN employee mgr ON emp.manager_id = mgr.id;`
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
    const [roles, fields] = await connection.promise().query(
        'select * from role'
    )
    const roleChoices = roles.map(role => ({
        name: role.title,
        value: role.id
    }))
    await inquirer
        .prompt([
            {
                type: 'input',
                messsage: "Employee's first name?",
                name: 'firstName'
            },
            {
                type: 'input',
                message: "Employee's last name?",
                name: 'lastName'
            },
            {
                type: 'list',
                message: "What is the employee's role?",
                choices: roleChoices,
                name: 'role'
            }
        ])
        .then(async data => {

            const [rows, fields] = await connection.promise().query(
                `insert into employee (first_name, last_name, role_id) 
                  values ('${data.firstName}', '${data.lastName}', '${data.role}')`
            )
            console.info(data.firstName, 'added!')
        })
        .catch(err => {
            console.error("error:", err)
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
        .catch(err => {
            console.error("error:", err)
        })
}

async function updateRoleQ() {
    const [employees, fields] = await connection.promise().query(
        'select * from employee',
    )
    const employeeChoices = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }))
    await inquirer
        .prompt([
            {
                type: 'list',
                message: 'Select the employee you want to update the role of:',
                choices: employeeChoices,
                name: 'employeeId'
            }
        ])
        .then(async data => {
            const [roles, fields] = await connection.promise()
                .query('select * from role')
            const roleChoices = roles.map(role => ({
                name: role.title,
                value: role.id
            }))

        await inquirer
            .prompt(
                {
                    type: 'list',
                    message: 'What is the role you want updated for selected Employee?',
                    choices: roleChoices,
                    name: 'roleId'
                }
            )
            .then(async roleData => {
                await connection.promise().query(
                    'update employee set role_id = ? where id = ?',
                    [roleData.roleId, data.employeeId]
                )
            })
        })
        .catch(err => {
            console.error("error:", err)
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
        .catch(err => {
            console.error("error:", err)
        })
}

async function seeBudgetQ() {
        await connection.promise().query(
            'delete from budget'
        )
        await connection.promise().query(
        `insert into budget (utilized_budget)
         select sum(salary) from role`
    )
    const [sum, fields] = await connection.promise().query(
        `select * from budget`
    )
    console.table(sum)
}

module.exports = {
    viewEmployeesQ, viewRolesQ, viewDepartmentsQ, addEmployeeQ,
    updateRoleQ, addDepartmentQ, addRoleQ, seeBudgetQ
}
