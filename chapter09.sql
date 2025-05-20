drop database if exists scoula_db;
create database scoula_db;
drop user if exists 'scoula'@'%';
create user 'scoula'@'%' identified by '1234';
grant all privileges on scoula_db.* to 'scoula'@'%';
flush privileges;


