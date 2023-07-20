const mysql = require('mysql2')
const connection = require('./db.js')

function viewEmployeesQ() {
    connection.query(
        'select * from employee',
        (err, results, fields) => {
            err ? console.error(err) :
            console.log('\n')
            console.table(results)
        }
    )
}

function viewRolesQ() {
    connection.query(
        'select * from role',
        (err, results, fields) => {
            err ? console.error(err) :
            console.table(results)
        })
}

function viewDepartmentsQ() {
    connection.query(
        'select * from department',
        (err, results, fields) => {
            err ? console.error(err) :
            console.table(results)
        }
    )

}

module.exports = { viewEmployeesQ, viewRolesQ, viewDepartmentsQ }
