var Product = require('../product');
var passport = require('passport');

var seedProduct = function() {

  Product.find({}, function(err, documents) {

    if(documents.length === 0){

      var prodArry = [
        {productName: 'Large Shirt', productAmount: 30},
        {productName: 'Medium Shirt', productAmount: 20},
        {productName: 'Small Shirt', productAmount: 10}
      ];

      for (var i = 0; i < prodArry.length; i++) {
         var data = new Product(
          {
            name: prodArry[i].productName,
            amount: prodArry[i].productAmount,
            currency: 'USD',
            forSale: true
          }
        );
        data.save();
      }

      console.log('Dummy products added!');
    }

  });

};

module.exports = seedProduct;