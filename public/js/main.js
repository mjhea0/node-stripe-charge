// this identifies your website in the createToken call below
Stripe.setPublishableKey('pk_test_1ejKLCjIWwvKauXLgvNrC7Vx');

$(document).ready(function() {
  $("#payment-form").submit(function(event) {
    // disable the submit button to prevent repeated clicks
    $('.submit-button').attr("disabled", "disabled");
    Stripe.createToken({
      number: $('.card-number').val(),
      cvc: $('.card-cvc').val(),
      exp_month: $('.card-expiry-month').val(),
      exp_year: $('.card-expiry-year').val()
    }, stripeResponseHandler);
    // prevent the form from submitting with the default action
    return false;
  });

  $("#recurring-form").submit(function(event) {
    // disable the submit button to prevent repeated clicks
    $('.submit').attr("disabled", "disabled");
    Stripe.createToken({
      number: $('.number').val(),
      cvc: $('.cvc').val(),
      exp_month: $('.expiry-month').val(),
      exp_year: $('.expiry-year').val(),
    }, stripeRecurringResponseHandler);
    // prevent the form from submitting with the default action
    return false;
  });  

});

function stripeResponseHandler(status, response) {
  if (response.error) {
    // show the errors on the form
    $(".payment-errors").text(response.error.message);
    $(".submit-button").removeAttr("disabled");
  } else {
    var form$ = $("#payment-form");
    // token contains id, last4, and card type
    var token = response['id'];
    // insert the token into the form so it gets submitted to the server
    form$.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
    // and submit
    form$.get(0).submit();
  }
}

function stripeRecurringResponseHandler(status, response) {
  if (response.error) {
    // show the errors on the form
    $(".recurring-errors").text(response.error.message);
    $(".submit").removeAttr("disabled");
  } else {
    var form$ = $("#recurring-form");
    // token contains id, last4, and card type
    var token = response['id'];
    // insert the token into the form so it gets submitted to the server
    form$.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
    // and submit
    form$.get(0).submit();
  }
}