Stripe.setPublishableKey('pk_test_1ejKLCjIWwvKauXLgvNrC7Vx');


$(document).ready(function() {

  $("#charge-error").hide();
  $('#payment-form').submit(function(event) {
    $("#charge-error").hide();
    var $form = $(this);
    // Disable the submit button to prevent repeated clicks
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken($form, stripeResponseHandler);
    // Prevent the form from submitting with the default action
    return false;
  });

  function stripeResponseHandler(status, response) {
    if (response.error) {
      // show the errors on the form
      $("#charge-error").show();
      $(".payment-errors").text(response.error.message);
      $(".submit-button").removeAttr("disabled");
    } else {
      var form$ = $("#payment-form");
      // token contains id, last4 digits, and card type
      var token = response.id;
      // insert the token into the form so it gets submitted to the server
      form$.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
      // and submit
      form$.get(0).submit();
    }
  }

});