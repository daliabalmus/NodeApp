const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
       res.send('Greetings from the Test controller!');
};

// controllers/products.js
exports.product_create = function (req, res) {
       let product = new Product(
           {
                  name: req.body.name,
                  price: req.body.price
           }
       );
       
       product.save(function (err) {
              if (err) {
                     return err;
              }
              res.send('Product Created successfully')
       })
};