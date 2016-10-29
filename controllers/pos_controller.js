/**
 * Created by Kristi Heredia on 10/28/2016.
 */
var models = require('../models');
var express = require('express');
var router = express.Router();

var orderArray = [];

// Loads the pos route if logged in
router.get('/', function (req, res) {
    if (req.session.logged_in) {
        return res.render('index', {
            logged_in: req.session.logged_in,
            email: req.session.username,
            employee_id: req.session.employee_id
        })
    } else {
        res.redirect('/');
    }
});

router.get('/add', function (req, res) {
    res.redirect('/');
});

router.post('/add', function (req, res) {
    var myItem = req.body.addItem;
    console.log("item:", myItem);
    // Check if the product sku or upc is in the database
    // >> maybe make the - optional
    models.Product.findOne({
        where: {
            $or: [{sku: myItem},
                {upc: myItem}
            ]
        }
    }).then(function (data) {
        if (data) {
            console.log("data:", data.sku);

            if (orderArray.length == 0) {
                var lineItem = {
                    sku: data.sku,
                    productName: data.productName,
                    price: data.price,
                    description: data.description,
                    qty: 1
                };
                orderArray.push(lineItem);
            } else {
                // check if sku is already there
                var found = -1;

                for (var i = 0; i < orderArray.length; i++) {
                    console.log("orderArray[i]:", orderArray[i]);

                    if (orderArray[i].sku == data.sku) {
                        console.log("found a match");
                        found = i;
                    }
                }
                if (found >= 0) {
                    orderArray[found].qty++;
                } else {
                    var lineItem = {
                        sku: data.sku,
                        productName: data.productName,
                        price: data.price,
                        description: data.description,
                        qty: 1
                    };
                    orderArray.push(lineItem);
                }
            }
            res.render('index', {
                // To make index.handlebars realize user is still logged in
                // when adding items
                logged_in: req.session.logged_in,
                email: req.session.username,
                employee_id: req.session.employee_id,
                data: orderArray
                //data: data
            })

        }
        else {
            res.json({err: "No data found for that sku"});
        }
    })

});

router.post('/delete', function (req, res) {
    console.log("id:", req.body.sku);
    //
    orderArray.splice(req.body.sku, 1);

    res.render('index', {
        // To make index.handlebars realize user is still logged in
        // when adding items
        logged_in: req.session.logged_in,
        email: req.session.username,
        employee_id: req.session.employee_id,
        data: orderArray

    });
});

router.post('/clear', function(req, res) {
    orderArray.length=0;
    res.render('index', {
        // To make index.handlebars realize user is still logged in
        // when adding items
        logged_in: req.session.logged_in,
        email: req.session.username,
        employee_id: req.session.employee_id,
        data: orderArray

    });
});

router.post('/checkout', function(req, res) {
    // render receipt
    var subtotal = 0;
    for (var i = 0; i < orderArray.length; i++) {
        subtotal += orderArray[i].price * orderArray[i].qty;
    }
    // Running out of time so hardcoding tax rate, ideally would be a setting the user could set
    var tax = subtotal * .07;
    var total = subtotal + tax;

   res.render('receipt', {
       logged_in: req.session.logged_in,
       email: req.session.username,
       employee_id: req.session.employee_id,
       data: orderArray,
       subtotal: subtotal.toFixed(2),
       tax: tax.toFixed(2),
       total: total.toFixed(2)
   })
});

module.exports = router;
