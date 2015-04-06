// INSPINIA Form spcific JS
$(document).ready(function () {

    $('.navbar').addClass('animated-header-scroll');

    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

    $('#register-btn').click(function(e){
        e.preventDefault();
        var alert = $('.alert');
        alert.addClass('hidden');

        $.ajax({
          type: 'POST',
          url: '/user',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({
            name: $('[name="name"]').val(),
            organization: $('[name="organization"]').val(),
            email: $('[name="email"]').val(),
            password: $('[name="password"]').val(),
            confirmPassword: $('[name="confirmPassword"]').val()
          }),
          success: function() {
            location.pathname='/login';
          },
          error: function(xhr) {
            var data = JSON.parse(xhr.responseText);
            if (data.length) {
              alert.html(data[0].msg).removeClass('hidden');
            } else if (data.msg) {
              alert.html(data.msg).removeClass('hidden');
            }
          }
        });
    });
});
