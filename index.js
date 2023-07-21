const inquirer = require('inquirer')
const { viewEmployeesQ, viewRolesQ, viewDepartmentsQ, addEmployeeQ,
     updateRoleQ, addDepartmentQ, addRoleQ } = require('./queries')

     menu()
function menu() {
    inquirer
        .prompt(
            {
                type: 'list',
                choices:
                    ['View all employees',
                        'Add an employee',
                        'Update employee role',
                        'View all roles',
                        'Add a role',
                        'View all departments',
                        'Add department',
                        'Quit'],
                name: 'action'
            })
        .then(data => {
            switch (data.action) {
                case 'View all employees':
                    viewEmployees()
                    break;
                case 'Add an employee':
                    addEmployee()
                    break;
                case 'Update employee role':
                    updateRole()
                    break;
                case 'View all roles':
                    viewRoles()
                    break;
                case 'Add a role':
                    addRole()
                    break;
                case 'View all departments':
                    viewDepartments()
                    break;
                case 'Add department':
                    addDepartment()
                    break;
                case 'Quit':
                    return process.exit()
            }
        })
}

async function viewEmployees() {
   await viewEmployeesQ()
    menu()
}

async function viewRoles() {
    await viewRolesQ()
    menu()
}

async function viewDepartments() {
    await viewDepartmentsQ()
    menu()
}

async function addEmployee() {
    await addEmployeeQ()
    menu()
}

async function addDepartment() {
    await addDepartmentQ()
    menu()
}

async function addRole() {
    await addRoleQ()
    menu()
}

async function updateRole() {
    await updateRoleQ()
    menu()
}