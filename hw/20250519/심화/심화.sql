use tabledb;
drop table if exists usertbl;

create table if not exists usertbl(
    userid  char(8) not null primary key,
    name    varchar(10) not null,
    birthyear   int not null
);

drop table if exists buytbl;

create table if not exists buytbl(
    num int not null primary key auto_increment,
    userid  char(8) not null,
    prodname    char(6) not null,
    foreign key(userid)  references  usertbl(userid)
);

drop table if exists usertbl,buytbl;

create table if not exists usertbl(
    userid  char(8) not null primary key,
    name    varchar(10) not null,
    birthyear   int not null,
    email   char(30)    null unique
);

drop table if exists usertbl;
create table if not exists usertbl(
    userid  char(8) not null primary key,
    name    varchar(10),
    birthyear   int CHECK (birthYear >= 1900 AND birthyear <= 2023),
    email   char(30)   not null
);

drop table if exists usertbl;
create table if not exists usertbl(
    userid  char(8) not null primary key,
    name    varchar(10),
    birthyear INT NOT NULL DEFAULT -1,
    addr CHAR(2) NOT NULL DEFAULT '서울',
    mobile1 CHAR(3) NULL,
    mobi1e2 CHAR(8) NULL,
    height SMALLINT NULL DEFAULT 170,
    mDate DATE NULL
);

INSERT INTO usertbl VALUES ('zlwmxkdla', 'euj', default, default, '010','2186-9316',default, '2023.12.12');


ALTER TABLE usertbl
    DROP COLUMN mobile1;

ALTER TABLE usertbl
    CHANGE COLUMN name uName VARCHAR(20) NULL;

ALTER TABLE usertbl
    DROP PRIMARY KEY;

use employees;
create view employees_info
as
SELECT E.emp_no, E.birth_date, E.first_name, E.last_name, E.gender, E.hire_date,T.title,T.from_date as t_frome,T.to_date as t_to, S.salary, S.from_date as s_from, S.to_date as s_to
FROM employees E
    INNER JOIN salaries S
ON E.emp_no = S.emp_no
JOIN titles T
    ON S.emp_no = T.emp_no;

select * from employees_info
where t_to like '2025%';

create view emp_dept_info
as
SELECT de.emp_no, de.dept_no, dp.dept_name, de.from_date,de.to_date
FROM dept_emp de
         INNER JOIN departments dp
                    ON de.dept_no = dp.dept_no;

select * from emp_dept_info
where to_date like '2025%';