create database manage_bus;
use (manage_bus)

drop table if exists employee;
drop table if exists department;
drop table if exists role;
drop table if exists budget;

create table department (
    id int auto_increment primary key,
    department_name varchar(50) not null
);

create table role (
    id int auto_increment primary key,
    title varchar(50) not null,
    salary decimal not null,
    index idx_salary (salary),
    department_id int not null,
    foreign key (department_id) references department(id)
);

create table employee (
    id int auto_increment primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    role_id int not null,
    manager_id int null,
    foreign key (role_id) references role(id),
    foreign key (manager_id) references employee(id)
);

create table budget (
    utilized_budget decimal
);