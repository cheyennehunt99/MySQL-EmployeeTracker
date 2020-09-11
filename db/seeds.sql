USE employeetracker_db;


INSERT INTO department 
    (name) 
VALUES 
    ("Airlines"),
    ("Pilot"),
    ("Airport Engineer"),
    ("HR");

INSERT INTO role 
    (title, salary, department_id) 
VALUES 
    ("Inflight Manager", 80000, 1),
    ("Flight Attendant", 50000, 1),
    ("Captain", 275000, 2),
    ("Co-Pilot", 125000, 2),
    ("Airport Design Engineer", 175000, 3),
    ("Flight Simulator Engineer", 250000, 3),
    ("Project Engineer", 450000, 3),
    ("VP Human Resources", 900000, 4);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id) 
VALUES 
    ("Susan", "Warren", 1, null),
    ("Ashley ", "Knox", 2, 1),
    ("Cheryl", "Linderwood", 2, 1),
    ("Amelia", "Smith", 3, null),
    ("Megan", "Galvan", 4, 3),
    ("Amalia", "Hilton", 5, null),
    ("Freda", "Hill", 5, null),
    ("Paris", "Hernandez", 6, null),
    ("Faith", "Miller", 6, null),
    ("Andrea", "Sanchez", 6, null),
    ("Elicia", "Orbison", 7, null),
    ("Hannah", "Hailey", 7, null),
    ("Karen", "Sanders", 8, null);