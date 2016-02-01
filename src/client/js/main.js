$( document ).ready(function() {

  // login form submit
  $('#login-form').on('submit', function(event){
    event.preventDefault();
    var $email = $('input[name="email"');
    var $password = $('input[name="password"');
    var payload = {
      email: $email.val(),
      password: $password.val()
    };
    $.ajax({
      method: 'POST',
      url: '/api/auth/login',
      data: payload
    })
    .done(function(resonse) {
      window.location.replace('/');
      $email.val('');
      $password.val('');
    })
    .fail(function(error){
      console.log(error.responseJSON.message);
    });
  });

});