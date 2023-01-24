const mysql = require ('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
// const Connection = require('mysql2/typings/mysql/lib/Connection');
// const { start } = require('repl');
// const { stat } = require('fs');


const db = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: '',
    password: '',
    database: 'eTracker_db'
},
console.log(`Connection to database successful!`)
);


startApp();


function startApp() {
    inquirer.prompt([{
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
    db.query('SELECT id as "Id", dep_name as "Department Name" FROM departments',
    function(err, results) {
    console.table(results);
    startApp();
});
}


function getAllRoles() {
    db.query('SELECT roles.id as "Id", title as "Title", salary as "Salary", departments.dep_name as "Department Name" FROM roles LEFT JOIN departments ON departments.id = department_id',
    function(err, results) {
    if(err){console.log(err);}
    console.table(results);
    startApp();
});
}


function getAllEmployees() {
    db.query(`SELECT employees.id as "Id", employees.first_name as "First Name", employees.last_name as "Last Name", roles.title as "Job Title", roles.salary as "Salary", departments.dep_name as "Department", CONCAT(managers.first_name," ", managers.last_name) as "Manager" FROM employees LEFT JOIN roles ON role_id = roles.id LEFT JOIN employees as managers ON employees.manager_id = managers.id LEFT JOIN departments ON departments.id = roles.department_id`,
    function(err, results) {
    if(err){console.log(err);}
    console.table(results);
    startApp();
});
}


function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'add_dept',
        message: 'What is the name of the department?',
    }]).then(answers => {
        db.query(`INSERT INTO departments(dep_name) VALUES ('${answers.add_dept}')`, 
        function(err, results) {
            if (results) {
                console.log("Department has been added!");
            } else
            console.log(err);
            startApp();
        });
    });
}


function addRole() {
    let departmentNames = [];
    db.query('SELECT dep_name FROM departments',
    function(err, results) {
        results.forEach(function(department) {
        departmentNames.push(department.dep_name);
        });

    inquirer.prompt([{
        type:   'input',
        name:   'title',
        message:'Enter Title',
},
{
        type:   'number',
        name:   'salary',
        message:'Enter Salary', 
},
{
        type:   'list',
        name:   'dept',
        message:'Choose the Department:',
        choices: departmentNames
}])

    .then(answers => {
        db.query(`SELECT id FROM departments WHERE dep_name = "${answers.dept}"`,
        function(err, results) {
        let chosenDept = results.shift();

        db.query(`INSERT INTO roles(title, salary,department_id) VALUES ("${answers.title}", "${answers.salary}", "${chosenDept.id}")`, function(err, results) {
            if (results) {
                console.log("New Role Added!");

}   else console.log(err);
        startApp(); });
});
});
});
}

function addEmployee() {
    let roleNames = [];
    db.query('SELECT title FROM roles', function(err, results) {
        results.forEach(function(role) {
            roleNames.push(role.title);
        });

    let managerNames = [];
    db.query('SELECT first_name, last_name FROM employees',
     function(err, results) {
            results.forEach(function(employee) {
                managerNames.push(`${employee.first_name} ${employee.last_name}`);
            });

        inquirer.prompt([{
            type:    'input',
            name:    'first_name',
            message: 'Enter first name',
},
{
            type:    'input',
            name:    'last_name',
            message: 'Enter last name',
},
{
            type:    'list',
            name:    'manager',
            message: 'Choose a Manager:',
            choices: managerNames
},
{
            type:    'list',
            name:    'role',
            message: 'Choose a Role:',
            choices: roleNames
}])
    .then(answers => {
        db.query(`SELECT id FROM roles WHERE title = "${answers.role}"`,
        function(err, results) {
            let chosenRole = results.shift();
            let nameArray = answers.manager.split(" ");
            let chosenFirst = nameArray[0];
            let chosenLast = nameArray[1];
                db.query(`SELECT id FROM employees WHERE first_name = "${chosenFirst}" AND last_name = "${chosenLast}"`,
                function(err, results) {
                    let chosenManager = results.shift();
                    db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("${answers.first_name}", "${answers.last_name}", "${chosenRole.id}", "${chosenManager.id}")`,
                    function(err, results) {
                        if (results) {
                            console.log("New Employee Added!");
                        } else console.log(err);
                        startApp();
                });
            });
        });
    });
});
});
}


function exit() {
    db.end;
    process.exit(0);
}