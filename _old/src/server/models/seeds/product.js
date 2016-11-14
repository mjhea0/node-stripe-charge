const Product = require('../product');

const seedProduct = function() {

  Product.find({}, (err, documents) => {

    if (documents.length === 0) {

      const prodArray = [
        {
          productName: 'Large Shirt',
          productAmount: 30
        },
        {
          productName: 'Medium Shirt',
          productAmount: 20
        },
        {
          productName: 'Small Shirt',
          productAmount: 10
        }
      ];

      for (let i = 0; i < prodArray.length; i++) {
        const data = new Product({
          name: prodArray[i].productName,
          amount: prodArray[i].productAmount,
          currency: 'USD',
          forSale: true
        });
        data.save();
      }

      console.log('Dummy products added!');
    }

  });

};

module.exports = seedProduct;
