var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "TeAmo1994",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // console.log("Connected as item_id " + connection.threadId)
    displayProducts();

});

var choices = [];

function displayProducts() {
    var query = connection.query("Select * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Product Name: " + res[i].product_name);
            console.log("Item Id: " + res[i].item_id);
            choices.push(res[i].item_id);
        }
        purchasePrompt();
    });
}

function purchasePrompt() {
    // prompt for info about the item being wanting to purchse


    inquirer
        .prompt([{
                name: "item_id",
                type: "list",
                message: "Please select your choices.",
                choices: choices

            },
            {
                name: "Quantity",
                type: "input",
                message: "How many units would you like?",
                validate: function(value) {
                    if ((isNaN(value) === false) && (value > 0) && (value % 1 === 0)) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(answer) {
            var query = connection.query("Select * FROM products WHERE ?", { item_id: answer.item_id }, function(err, res) {
                if (err) throw err;
                console.log("Your item(s) has been added to the bag!")
                    // console.log(res);
                orderPlaced(res[0], answer.Quantity);

            })
        });
}

function orderPlaced(product, Quantity) {
    if (Quantity > product.stock_quantity) {
        console.log("Insufficient quantity!")
    } else {
        updateProduct();
        console.log("Updating the quantities of " + product.product_name);
        var query = connection.query(
            "UPDATE products SET ? WHERE ?", [{
                stock_quantity: product.stock_quantity - Quantity
            }, {
                item_id: product.item_id
            }]
        )
    };
}

function updateProduct() {

};