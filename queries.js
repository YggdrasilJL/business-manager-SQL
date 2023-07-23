const connection = require('./db/db.js')
const inquirer = require('inquirer')

async function viewEmployeesQ() {
    // need to deconstruct and use fields instead of just rows because it will display an object
    // and break if we dont deconstruct into 2 variables
    const [allEmployees, fields] =
        await connection.promise().query(
            // uppercase mysql commands to make the large query more readable in vscode
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
    console.table(allEmployees)
}

// queries below
async function viewRolesQ() {
    const [roles, fields] = await connection.promise().query(
        'select * from role'
    )
    // console.table npm formats a table for you
    console.table(roles)
}

async function viewDepartmentsQ() {
    const [departments, fields] = await connection.promise().query(
        'select * from department'
    )
    console.table(departments)
}

async function addEmployeeQ() {
    const [roles, fields] = await connection.promise().query('select * from role');

    // use map method to display all roles dynamically
    const roleChoices = roles.map(role => ({
        name: role.title,
        value: role.id
    }));

    const [employees, fieldz] = await connection.promise().query('select * from employee');
    const employeeChoices = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    employeeChoices.push('NO MANAGER');
    employeeChoices.unshift({ name: 'NO MANAGER', value: null });

    await inquirer
        .prompt([
            {
                type: 'input',
                message: "Employee's first name?",
                validate: lengthValidator,
                name: 'firstName'
            },
            {
                type: 'input',
                message: "Employee's last name?",
                validate: lengthValidator,
                name: 'lastName'
            },
            {
                type: 'list',
                message: "Employee's manager?",
                choices: employeeChoices,
                name: 'empManager'
            },
            {
                type: 'list',
                message: "What is the employee's role?",
                choices: roleChoices,
                name: 'role'
            }
        ])
        .then(async data => {
            const managerId = data.empManager === 'NO MANAGER' ? null : data.empManager;

            await connection.promise().query(
                'insert into employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)',
                [data.firstName, data.lastName, data.role, managerId]
            );
            console.info(data.firstName, 'added!');
        })
        .catch(err => {
            console.error("error:", err);
        });
}


async function addRoleQ() {
    const [departments, fields] = await connection.promise().query(
        'select * from department'
    )
    const departmentChoices = departments.map(department => ({
        name: department.department_name,
        value: department.id
    }))
    await inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the role?",
                validate: roleLengthValidator,
                name: 'roleName'
            },
            {
                type: 'input',
                message: 'What is the salary for said role?',
                validate: salaryValidator,
                name: 'salary'
            },
            {
                type: 'list',
                message: 'What is the department this role is in?',
                choices: departmentChoices,
                name: 'department'
            }
        ])
        .then(async data => {
            await connection.promise().query(
                `insert into role (title, salary, department_id) values ('${data.roleName}','${data.salary}', ${data.department})`
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
                    console.log('Role updated')
                })
                .catch(err => {
                    console.error("error:", err)
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
                validate: depLengthValidator,
                name: 'addDepartment'
            }
        )
        .then(async departmentName => {
            await connection.promise().query(
                `insert into department (department_name) value ('${departmentName.addDepartment}')`
            )
            console.info(departmentName.addDepartment, 'department added.')
        })
        .catch(err => {
            console.error("error:", err)
        })
}

async function calculateBudget() {
    const [budget, fields] = await connection.promise().query(
        // calculates the collective sum of each department
        `SELECT dep.department_name AS department, SUM(rl.salary) AS utilized_budget
       FROM employee emp
       LEFT JOIN role rl ON emp.role_id = rl.id
       LEFT JOIN department dep ON rl.department_id = dep.id
       GROUP BY department`
    )

    return budget
}

async function seeBudgetQ() {
    const budgetData = await calculateBudget()
    console.table(budgetData)
}


// validators below
const lengthValidator = async (input) => {
    if (input.length <= 1) {
        return 'Please enter valid name.';
    } else {
        return true;
    }
}

const roleLengthValidator = async (input) => {
    if (input.length <= 1) {
        return 'Please enter valid role name.';
    } else {
        return true;
    }
}

const depLengthValidator = async (input) => {
    if (input.length <= 1) {
        return 'Please enter valid department name.';
    } else {
        return true;
    }
}

const salaryValidator = async (input) => {
    // validates if the user input is a number, if not it prompts the user
    if (isNaN(input)) {
        return 'Please enter valid salary.';
    } else {
        return true;
    }
}

module.exports = {
    viewEmployeesQ, viewRolesQ, viewDepartmentsQ, addEmployeeQ,
    updateRoleQ, addDepartmentQ, addRoleQ, seeBudgetQ
}