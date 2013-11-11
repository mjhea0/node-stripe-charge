// make sure to update the secret key
var stripe = require('stripe')('sk_test_Yg1k3ukwmBM6nEg6e26dk1us');

module.exports = function(app){
  app.get('/recurring',
    function(req,res){
        res.json({});
    }
  );

  app.post('/recurring',
    function(req,res) {
      // obtain token
      var transaction = req.body;
      console.log(req.body)
      var stripeToken = transaction.stripeToken;

      // create plan
      var plan =
      {
        amount: 10*200,
        interval: "month",
        name: "Amazing Gold Plan",
        currency: "usd",
        id: "gold"            
      };

      stripe.plans.create(plan,

        function(err, plan)
        {
          if(err)
            console.log(err);
          else
          {
            res.json(plan);
            console.log('Successful plan sent to Stripe!');
          }
        }
      );

      stripe.customers.create({
        card: stripeToken,
        plan: "gold",
        email: "payinguser@example.com"
      }, function(err, customer)
          {
            if(err)
              console.log(err);
            else
            {
              res.json(customer);
              console.log('Successful customer sent to Stripe!');
            }
          }
      );
    }
  );
};