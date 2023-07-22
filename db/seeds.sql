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

  ('Software Engineer', 90000, 1),

  ('Sales Manager', 115200, 2),

  ('CEO', 4528000, 3),

  ('HR Coordinator', 65200, 4),

  ('Financial Analyst', 85020, 5),

  ('Customer Service Representative', 50000, 6),

  ('Project Manager', 100000, 7),

  ('Graphic Designer', 70000, 8),

  ('Data Analyst', 75000, 9),

  ('Product Manager', 110000, 10);

-- insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Peter', 'Parker', 1, NULL),

  ('Steve', 'Harrington', 2, NULL),

  ('Tony', 'Stark', 3, 1),

  ('Will', 'Byers', 4, 3),

  ('Steve', 'Rogers', 5, 1),

  ('Natasha', 'Romanoff', 6, 3),

  ('Bruce', 'Banner', 7, 2),

  ('Wanda', 'Maximoff', 8, 1),

  ('Bucky', 'Barnes', 9, 2),

  ('Mike', 'Wheeler', 10, 3);