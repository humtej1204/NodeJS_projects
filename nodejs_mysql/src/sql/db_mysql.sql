DROP DATABASE test_soyclara;
CREATE DATABASE IF NOT EXISTS test_soyclara;

USE test_soyclara;

CREATE TABLE IF NOT EXISTS packages(
	id INT NOT NULL AUTO_INCREMENT UNIQUE,
	name VARCHAR(255) NOT NULL,
	description TEXT,
	price FLOAT(7,2) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS categories(
	id INT NOT NULL AUTO_INCREMENT UNIQUE,
	name VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS subcateg(
	id INT NOT NULL AUTO_INCREMENT UNIQUE,
	name VARCHAR(255) NOT NULL,
	category_id INT NOT NULL,
	UNIQUE(name, category_id),
	PRIMARY KEY(id)
);
ALTER TABLE subcateg ADD CONSTRAINT FOREIGN KEY (category_id) REFERENCES categories(id);

CREATE TABLE IF NOT EXISTS pack_subcat(
	package_id INT NOT NULL,
	subcateg_id INT NOT NULL, 
	UNIQUE(package_id, subcateg_id)
);
ALTER TABLE pack_subcat ADD CONSTRAINT FOREIGN KEY (package_id) REFERENCES packages(id),
ADD CONSTRAINT FOREIGN KEY (subcateg_id) REFERENCES subcateg(id);


CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT UNIQUE,
  username VARCHAR(16) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO packages(name, description, price) VALUES('pack01', 'first package', 100.00);
INSERT INTO packages(name, description, price) VALUES('pack02', 'second package', 110.00);
INSERT INTO packages(name, description, price) VALUES('pack03', 'thrird package', 115.00);
INSERT INTO packages(name, description, price) VALUES('pack04', 'fourth package', 125.00);
INSERT INTO packages(name, description, price) VALUES('pack05', 'fifth package', 140.00);
INSERT INTO packages(name, description, price) VALUES('pack06', 'sixth package', 150.00);
INSERT INTO packages(name, description, price) VALUES('pack07', 'seventh package', 85.00);
INSERT INTO packages(name, description, price) VALUES('pack08', 'eighth package', 165.00);
INSERT INTO packages(name, description, price) VALUES('pack09', 'ninth package', 180.00);
INSERT INTO packages(name, description, price) VALUES('pack10', 'tenth package', 90.00);

INSERT INTO categories(name) VALUES('cat01');
INSERT INTO categories(name) VALUES('cat02');
INSERT INTO categories(name) VALUES('cat03');
INSERT INTO categories(name) VALUES('cat04');

INSERT INTO subcateg(name, category_id) VALUES('sub_c a1', 1);
INSERT INTO subcateg(name, category_id) VALUES('sub_c b1', 2);
INSERT INTO subcateg(name, category_id) VALUES('sub_c a2', 1);
INSERT INTO subcateg(name, category_id) VALUES('sub_c b2', 2);
INSERT INTO subcateg(name, category_id) VALUES('sub_c c1', 3);
INSERT INTO subcateg(name, category_id) VALUES('sub_c a3', 1);
INSERT INTO subcateg(name, category_id) VALUES('sub_c d1', 4);

INSERT INTO pack_subcat VALUES(1, 1);
INSERT INTO pack_subcat VALUES(2, 3);
INSERT INTO pack_subcat VALUES(3, 4);
INSERT INTO pack_subcat VALUES(4, 7);
INSERT INTO pack_subcat VALUES(5, 6);
INSERT INTO pack_subcat VALUES(6, 5);
INSERT INTO pack_subcat VALUES(7, 4);
INSERT INTO pack_subcat VALUES(8, 3);
INSERT INTO pack_subcat VALUES(9, 2);
INSERT INTO pack_subcat VALUES(10, 1);

SELECT * FROM packages;
SELECT * FROM categories;
SELECT * FROM subcateg;
SELECT * FROM pack_subcat;
