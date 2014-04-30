$(function() {
	$.fn.luhn = function() {
		var number = [], $this = this;
		$('input', this).keyup(function() {
			number[$(this).index()] = parseInt($.trim($(this).val()));
			if(number.length == 4 && luhn(number.join(''))) {
				$this.removeClass('has-error').addClass('has-success');
			}
			else {
				$this.removeClass('has-success').addClass('has-error');
			}
		});
	};
	$('#luhn').luhn();
});
