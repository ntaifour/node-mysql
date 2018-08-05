var Table = require('cli-table3');
var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'Red@lert2k15',
	database: 'bamazon'
});

// Establish Connection
connection.connect(function(err){
	if (err) throw err;
    console.log('connected as id: ' + connection.threadId)
    startPrompt();
});

// Asks user if they would like to check out the store
function startPrompt() {

    inquirer.prompt([{

        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon! Would you like to view our inventory?",
        default: true

    }]).then(function(user) {
        if (user.confirm === true) {
            inventory();
        } else {
            console.log("Thank you! Come back soon!");
        }
    });
};

// Display all of the items available for sale
function inventory() {
     
    var table = new Table({
        head: ['Item ID', 'Item Name', 'Department', 'Price', 'Quantity'],
        colWidths: [8, 30, 30, 20, 20],
        wordWrap:true
    });
    
    displayInventory();
    
    function displayInventory() {
        var query = 'SELECT * FROM products'
        connection.query(query, function(err, res) {
            for (var i = 0; i < res.length; i++) {
            
                var itemID = res[i].item_id,
                productName = res[i].product_name,
                departmentName = res[i].department_name,
                price = res[i].price,
                stockQuantity = res[i].stock_quantity;

                table.push(
                    [itemID, productName, departmentName, price, stockQuantity]
                );
            }

            console.log("");
            console.log("============================================ Current Bamazon Inventory ==========================================");
            console.log("");
            console.log(table.toString());
            console.log("");
            itemInquiry();

        })
    };
};

// Asks customer for the ID of the product they would like to buy and how many
function itemInquiry(){
    
    inquirer.prompt([{
    // Inquirer prompt for product
        type: "input",
        name: "itemID",
        message: "Please enter the Item ID product you would like to purchase.",
        // Ensures that customer is inputting a valid number
        validate: function(value) {
            if (isNaN(value) == true) {
                console.log("");
                console.log("");
                console.log("ERROR: Please enter a valid Item ID.");
                console.log("");
                return false;
            } else {
                return true;
            }
        },
    },
    // Inquirer prompt for quantity of product to be purchased
    {
        type: "input",
        name: "itemQuantity",
        message: "How many units of this item would you like to purchase?",
        // Ensures that customer is inputting a valid number
        validate: function(value) {
            if (isNaN(value) == true) {
                console.log("");
                console.log("");
                console.log("ERROR: Please enter a valid quantity number.")
                console.log("");
                return false;
            } else {
                return true;
            }
        } 
    }
    
    // Checks to see if store has enough product to meet the customer's request
    ]).then(function quantityCheck(userPurchase) {

        connection.query("SELECT * FROM products WHERE item_id=?", userPurchase.itemID, function(err, res) {
            for (var i = 0; i < res.length; i++) {

                if (userPurchase.itemQuantity > res[i].stock_quantity) {

                    console.log("=======================================================");
                    console.log("Insufficient quantity! Please enter a different amount.");
                    console.log("=======================================================");
                    enterQuantity();

                } else {
                    //list item information for user for confirm prompt
                    console.log("===================================");
                    console.log("Your order can be fulfilled!");
                    console.log("===================================");
                    console.log("You've selected:");
                    console.log("----------------");
                    console.log("Item: " + res[i].product_name);
                    console.log("Department: " + res[i].department_name);
                    console.log("Price: $" + res[i].price);
                    console.log("Quantity: " + userPurchase.itemQuantity);
                    console.log("----------------");
                    console.log("Total: $" + res[i].price * userPurchase.itemQuantity);
                    console.log("===================================");

                    var newStock = (res[i].stock_quantity - userPurchase.itemQuantity);
                    var purchaseId = (userPurchase.itemID);
                    confirmOrder(newStock, purchaseId);
                }
            }
        });
    });
};

// looking to tie this function back into the function above once user inputs a valid entity, but the execution ends as soon as it reaches the function call
// function that restarts the request for quantity when user's request is to large
function enterQuantity() {
    inquirer.prompt([{
        type: "input",
        name: "itemQuantity",
        message: "How many units of this item would you like to purchase?",
        // Ensures that customer is inputting a valid number
        validate: function(value) {
            if (isNaN(value) == true) {
                console.log("");
                console.log("");
                console.log("ERROR: Please enter a valid quantity number.")
                console.log("");
                return false;
            } else {
                return true;
            }
        } 
    }]);
    console.log("error");
    quantityCheck();
};

function confirmOrder(newStock, purchaseId) {

    inquirer.prompt([{

        type: "confirm",
        name: "confirmPurchase",
        message: "Would you like to proceed with this order?",
        default: true

    }]).then(function(userConfirm) {
        if (userConfirm.confirmPurchase === true) {

            //if user confirms purchase, update mysql database with new stock quantity by subtracting user quantity purchased.

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newStock
            }, {
                item_id: purchaseId
            }], function(err, res) {});

            console.log("=================================");
            console.log("Your order has been placed. Thank you for shopping with Bamazon!");
            console.log("=================================");
            startPrompt();
        } else {
            console.log("=================================");
            console.log("Thank you for visiting!");
            console.log("=================================");
            startPrompt();
        }
    });
};
