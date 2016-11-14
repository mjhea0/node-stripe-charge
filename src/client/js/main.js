Stripe.setPublishableKey('pk_test_zwqTANWFAlDEa78RoI3AhwVl');

$('#charge-error').hide();

$(document).ready(() => {

  $('#payment-form').submit(function(event) {
    $('#charge-error').hide();
    const $form = $(this);
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken($form, stripeResponseHandler);
    return false;
  });

});

function stripeResponseHandler(status, response) {
  if (response.error) {
    $('#charge-error').show();
    $('.payment-errors').text(response.error.message);
    $('.submit-button').removeAttr('disabled');
  } else {
    const $form = $('#payment-form');
    const token = response.id;
    $form.append('<input type="hidden" name="stripeToken" value="' + token + '"/>');
    $form.get(0).submit();
  }
}
