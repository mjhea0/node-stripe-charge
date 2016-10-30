Stripe.setPublishableKey('pk_test_zwqTANWFAlDEa78RoI3AhwVl');


$(document).ready(function() {

  $('#charge-error').hide();

  $('#payment-form').submit(function(event) {
    $('#charge-error').hide();
    const $form = $(this);
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken($form, stripeResponseHandler);
    return false;
  });
  

  function stripeResponseHandler(status, response) {
    if (response.error) {
      $('#charge-error').show();
      $('.payment-errors').text(response.error.message);
      $('.submit-button').removeAttr('disabled');
    } else {
      var form$ = $('#payment-form');
      var token = response.id;
      form$.append('<input type="hidden" name="stripeToken" value="' + token + '"/>');
      form$.get(0).submit();
    }
  }

  $('#add-product-form').submit(function(event) {
    event.preventDefault();
    $('#product-response').text('');
    var payload = {name: $('#product-name').val(), amount:$('#product-price').val()};
    $.ajax({
      type: 'POST',
      url: '/api/v1/products',
      data: payload
    })
    .done(function(data) {
      $('#product-response').text('Yay! Product Added!');
    })
    .fail(function() {
      $('#product-response').text('Yike! Something went wrong.');
    });
    $('#product-name').val('');
    $('#product-price').val('');
  });

});