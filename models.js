var mongoose = require('mongoose');

var stripeSchema = mongoose.Schema({
	token: String,
	time: {type: Date, default: Date.now}
});

mongoose.model('Stripe', stripeSchema)
