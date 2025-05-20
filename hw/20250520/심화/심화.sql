use sqldb;

select * from usertbl;
show index from usertbl;
show table status like 'usertbl';

create index idx_usertbl_addr
on usertbl(addr);

show index from usertbl;

show table status like 'usertbl';
analyze table usertbl;
show table status like 'usertbl';

create unique index idx_usertbl_birthyear
on usertbl(birthYear);

create unique index idx_usertbl_name
on usertbl(name);

show index from usertbl;

drop index idx_usertbl_name on usertbl;

create unique index idx_usertbl_name_birthyear
on usertbl(name,birthYear);

show index from usertbl;

drop index idx_usertbl_addr on usertbl;
drop index idx_usertbl_name_birthyear on usertbl;

drop database if exists scoula_db;
create database scoula_db;
drop user if exists 'scoula'@'%';
create user 'scoula'@'%' identified by '1234';
grant all privileges on scoula_db.* to 'scoula'@'%';
flush privileges;

SHOW GRANTS FOR 'scoula';