-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS soyclara_sequelize_test;
CREATE USER IF NOT EXISTS 'haru'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'haru'@'localhost';
FLUSH PRIVILEGES;
