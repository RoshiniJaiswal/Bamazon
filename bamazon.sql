DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);


INSERT INTO products (item_id, product_name, price, stock_quantity)
VALUES ("101", "Salted Caaramel Macaroons", 2.50, 100), 
("102", "Rose Macaroons", 2.50, 120),
("103", "Raspberry Macaroons", 3.00, 150),
("104", "Pistachio Macaroons", 2.99, 500),
("105", "Chocolate Macaroons", 8.00, 300),
("106", "Black Current Macaroons", 1.99, 350);
       

SELECT * FROM products