const mysql = require ('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const Connection = require('mysql2/typings/mysql/lib/Connection');
const { start } = require('repl');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'preston',
    database: 'eTracker_db'
},
console.log(`Connection to database successful!`)
);


startApp();

function startApp() {
    inquirer.createPromptModule([{
        type: 'list',
        name: 'action',
        message: 'choose from the options below...',
        choices: ['View All Departments',
                  'View All Roles',
                  'View All Employees',
                  'Add Department',
                  'Add Role',
                  'Add Employee',
                  'EXIT' ]
    }])
    .then(answers => {
        if (answers.action === 'View All Departments') {
            getAllDepartments();
        }
        
        if (answers.action === 'View All Roles') {
            getAllRoles();
        }
        if (answers.action === 'View All Employees') {
            getAllEmployees();
        }
        
        if (answers.action === 'Add Department') {
            addDepartment();
        }

        if (answers.action === 'Add Role') {
            addRole();
        }
        
        if (answers.action === 'Add Employee') {
            addEmployee();
        }
        if (answers.action === 'EXIT') {
            exit();
        }
    });
};


function getAllDepartments() {
    db.query('SELECT id as "Id", dep_name as "Department Name" FROM departments',
    function(err, results) {
    console.table(results);
    startApp();
});
}

function getAllRoles() {
    db.query('SELECT roles.id as "Id", title as "Title", salary as "Salary", departments.dep_name as "Department Name" FROM roles LEFT JOIN departments.id = department_id',
    function(err, results) {
    console.table(results);
    startApp();
});
}

function getAllEmployees() {
    db.query(`SELECT employees.id as "Id", employees.first_name as "First Name", 
    employees.last_name as "Last Name", roles.title as "Job Title", roles.salary as "Salary",
    departments.dep_name as "Department", CONCAT(managers.first_name," ", managers.last_name)
    as "Manager" FROM employees LEFT JOIN roles ON role_id = roles.id LEFT JOIN 
    employees as managers ON employees.manager_id = managers.id LEFT JOIN departments
    ON departments.id = roles.department_id`,
    function(err, results) {
    console.table(results);
    startApp();
});
}



function getAllDepartments() {
    db.query('')
}
function getAllDepartments() {
    db.query('')
}
function getAllDepartments() {
    db.query('')
}
function getAllDepartments() {
    db.query('')
}









function exit() {
    db.end;
    process.exit(0);
}