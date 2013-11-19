// make sure to update the secret key
var stripe = require('stripe')('sk_test_Yg1k3ukwmBM6nEg6e26dk1us');

module.exports = function(app){
  app.get('/stripe',
    function(req,res){
      // add a page here indicating that there is nothing to see
      res.send("Scram!")
    }
  );

  app.post('/stripe',
    function(req,res) {
      // obtain StripeToken
      // !!!add token to monogo!!!
      var transaction = req.body;
      var stripeToken = transaction.stripeToken;
      // create charge
      var charge =
      {
        amount: 10*100, 
        currency: 'USD',
        card: stripeToken
      };
      stripe.charges.create(charge,
        function(err, charge) {
          if(err)
            console.log(err);
          else
            {
              res.json(charge);
              console.log('Successful charge sent to Stripe!');
            };
        }       
      );
    // render congrats page
    res.render('congrats', { title: "Congrats!", charge: charge.amount/100.00});
    }
  );
};



// test
// var quote = new Customer({token: "test" })
// quote.save();


//   app.post('/applicant', function(req, res) {
//     var newApp;
//     newApp = new Application({
//       name: req.body.name,
//       bio: req.body.bio,
//       skills: req.body.skills.split(','),
//       experience: req.body.years,
//       why: req.body.why
//     });
//     return newApp.save(function(err) {
//       if (err) {
//         return res.send(err);
//       } else {
//         return Application.find({}, function(err, appData) {
//           return res.send({
//             success: 'Success!',
//             applicants: appData
//           });
//         });
//       }
//     });
//   });
