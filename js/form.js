// INSPINIA Form spcific JS
$(document).ready(function () {

    $('.navbar').addClass('animated-header-scroll');

    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

    var showError = function(xhr) {
      var alert = $('.alert-danger');
      var data = JSON.parse(xhr.responseText);
      if (Array.isArray(data)) {
        alert.html(data[0].msg).removeClass('hidden');
      } else if (data.msg) {
        alert.html(data.msg).removeClass('hidden');
      }
    };

    var hideError = function() {
      var alert = $('.alert');
      alert.addClass('hidden');
    };

    $('#register-btn').click(function(e){
        e.preventDefault();
        hideError();

        $.ajax({
          type: 'POST',
          url: '/user',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({
            firstName: $('[name="firstName"]').val(),
            lastName: $('[name="lastName"]').val(),
            organization: $('[name="organization"]').val(),
            email: $('[name="email"]').val(),
            password: $('[name="password"]').val(),
            confirmPassword: $('[name="confirmPassword"]').val()
          }),
          success: function() {
            location.pathname='/login';
          },
          error: showError
        });
    });

    $('#login-btn').click(function(e){
        e.preventDefault();
        hideError();

        var creds = {
          email: $('[name="email"]').val(),
          password: $('[name="password"]').val(),
        }

        $.ajax({
          type: 'POST',
          url: '/login',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify(creds),
          success: function() {
            sessionStorage.setItem('eratecycle', JSON.stringify(creds));
            location.pathname='/portal';
          },
          error: showError
        });
    });

    $('#forgot-btn').click(function(e){
        e.preventDefault();
        hideError();

        $.ajax({
          type: 'POST',
          url: '/forgot',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({
            email: $('[name="email"]').val()
          }),
          success: function() {
            $('.alert-success').html('<strong>Success</strong> email has been sent!').removeClass('hidden');
          },
          error: showError
        });
    });

    $('#reset-btn').click(function(e){
        e.preventDefault();
        hideError();

        $.ajax({
          type: 'POST',
          url: '/reset/' + location.search.split('=')[1],
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({
            password: $('[name="password"]').val(),
            confirm: $('[name="confirm"]').val()
          }),
          success: function() {
            location.pathname='/login';
          },
          error: showError
        });
    });
});
