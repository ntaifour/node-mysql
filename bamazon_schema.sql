DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) DEFAULT 0,
	stock_quantity INT DEFAULT 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Sony WH-1000XM2', 'Electronics', 349.98, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Lamicall Cell Phone Stand', 'Cell Phones & Accessories', 9.99, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('SUPCASE Unicorn Beetle', 'Cell Phones & Accessories', 6.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('YETI Rambler 20 oz', 'Home & Kitchen', 29.99, 31);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Energizer AA Alkaline Batteries (48-count)', 'Household Supplies)', 12.59, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Sony PS4 Controller', 'Video Games', 46.96, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Cyxus Blue Light Blocking Computer Glasses', 'Health & Household', 19.90, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Samsung Gear S3 Frontier Smartwatch ', 'Electronics', 297.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Amazon Kindle Paperwhite E-reader', 'Electronics', 119.99, 65);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('New Balance 574 Sport Running Shoe', 'Clothing, Shoes & Jewelry ', 99.95, 2);

