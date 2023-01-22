INSERT INTO departments (id, dep_name)
VALUES (001, "Management"      ),
       (002, "Sales"           ),
       (003, "Accounting"      ),
       (004, "Customer Support");

INSERT INTO roles (id, department_id, title, salary)
VALUES (001, 001 "Regional Manager",  180000.00),
       (002, 001 "Assistant Manager", 150000.00),
       (003, 002 "Sales Rep",         110000.00),
       (004, 002 "Sales Associate",    98000.00),
       (005, 003 "Accountant",         89000.00),
       (006, 003 "Accountant Jr",      75000.00),
       (007, 004 "Service Agent",      64000.00),
       (008, 004 "Receptionist",       58000.00);

INSERT INTO employees (id, role_id, manager_id, first_name, last_name)
VALUES (001, 001, NULL  "Michael",  "Scott"    ),
       (002, 002, 001,  "Dwight",   "Schrute"  ),
       (003, 003, NULL, "Malcolm",  "Donalbain"),
       (004, 004, 003,  "Orsino",   "Kale"     ),
       (005, 005, NULL, "Yorick",   "Grave"    ),
       (006, 006, 005,  "Cordelia", "Lear"     ),
       (007, 007, NULL, "Petruchio","Tame"     ),
       (008, 008, 007,  "Horatio",  "Court"    );