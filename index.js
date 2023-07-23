const inquirer = require('inquirer')
// import all queries from queries.js
const { viewEmployeesQ, viewRolesQ, viewDepartmentsQ, addEmployeeQ,
    updateRoleQ, addDepartmentQ, addRoleQ, seeBudgetQ
} = require('./queries')

menu()
async function menu() {
// 'employee manager' sign
    console.log(`
    
    __  ______                 _                         __  __                                    __   
   / / |  ____|               | |                       |  \\/  |                                   \\ \\  
  | |  | |__   _ __ ___  _ __ | | ___  _   _  ___  ___  | \\  / | __ _ _ __   __ _  __ _  ___ _ __   | | 
 / /   |  __| | '_ ' _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\ | |\\/| |/ _' | '_ \\ / _' |/ _' |/ _ \\ '__|   \\ \\
 \\ \\   | |____| | | | | | |_) | | (_) | |_| |  __/  __/ | |  | | (_| | | | | (_| | (_| |  __/ |      / /
  | |  |______|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___| |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|     | | 
   \\_\\                  | |             __/ |                                      __/ |           /_/  
                        |_|            |___/                                      |___/                 
`);

    await inquirer
        .prompt({
            type: 'list',
            message: 'What would you like to do?',
            choices:
                ['View all employees',
                    'Add an employee',
                    'Update employee role',
                    'View all roles',
                    'Add a role',
                    'View all departments',
                    'Add department',
                    'See annual utilized budget',
                    'Quit'],
            name: 'action'
        })
        .then(data => {
            // switch case for each choice the user chooses, calls a function for each
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
                case 'See annual utilized budget':
                    seeBudget()
                    break;
                case 'Quit':
                    return quit()
            }
        })
        .catch(err => {
            console.error("error:", err)
        })
}

// choices functions that call the queries, then call the main menu

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

async function seeBudget() {
    await seeBudgetQ()
    menu()
}
// quit function with confirmation
async function quit() {
    await inquirer
        .prompt(
            {
                type: 'list',
                message: 'Are you sure you want to quit?',
                choices: ['Yes', 'No'],
                name: 'quit'
            }
        )
        .then(async data => {
            await data.quit === 'Yes' ? process.exit() : menu()
        })
        .catch(err => {
            console.error("error:", err)
        })
}