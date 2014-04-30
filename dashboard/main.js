$(function() {
	$.fn.luhn = function() {
		var number = [], $this = this;
		$('input', this).keyup(function() {
			number[$(this).index()] = $.trim($(this).val());
			if(number.join('').length == 16) {
				if(!isNaN(number[0]) && luhn(number.join(''))) {
					$this.removeClass('has-error').addClass('has-success')
					.prev('.alert').removeClass('alert-danger').addClass('alert-success').text('Is valid').show();
				}
				else {
					$this.removeClass('has-success').addClass('has-error')
					.prev('.alert').removeClass('alert-success').addClass('alert-danger').text('Is not valid').show();
				}
			}
			else {
				$this.prev('.alert').hide();
			}
		});
	};
	$('#luhn').luhn();
});
