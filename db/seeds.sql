insert into department (department_name)
values
  ('Engineering'),

  ('Sales'),

  ('Marketing'),

  ('Human Resources'),

  ('Finance'),

  ('Customer Service'),

  ('Project Management'),

  ('Design'),

  ('Analytics'),
  
  ('Product Development');

-- insert roles
insert into role (title, salary, department_id)
values

  ('Software Engineer', 80000, 1),

  ('Sales Manager', 90000, 2),

  ('Marketing Specialist', 75000, 3),

  ('HR Coordinator', 60000, 4),

  ('Financial Analyst', 85000, 5),

  ('Customer Service Representative', 50000, 6),

  ('Project Manager', 100000, 7),

  ('Graphic Designer', 70000, 8),

  ('Data Analyst', 75000, 9),

  ('Product Manager', 110000, 10);

-- insert employees
insert into employee (first_name, last_name, role_id, manager_id)
values

  ('John', 'Doe', 1, NULL),

  ('Jane', 'Smith', 2, NULL),

  ('Michael', 'Johnson', 3, 1),

  ('Emily', 'Williams', 4, 3),

  ('Christopher', 'Brown', 5, 1),

  ('Jessica', 'Jones', 6, 3),

  ('William', 'Davis', 7, 2),

  ('Sarah', 'Miller', 8, 1),

  ('David', 'Wilson', 9, 2),

  ('Olivia', 'Taylor', 10, 3);