$(function() {
	$.fn.luhn = function() {
		var number = [], $this = this, type = {
			"American Express": [34, 37],
			"Bankcard": [5610, 560221, 560222, 560223, 560224, 560225],
			"China UnionPay": [62, 88],
			"Diners Club Carte Blanche": [300, 301, 302, 303, 304, 305],
			"Diners Club enRoute": [2014, 2149],
			"Diners Club International": [309, 36, 38, 39],
			"Diners Club United States & Canada": [54, 55],
			"Discover Card": [6011, 622, 644, 645, 646, 647, 648, 649, 65],
			"InstaPayment": [637, 638, 639],
			"JCB": [35],
			"Laser": [6304, 6706, 6771, 6709],
			"Maestro": [5018, 5020, 5038, 5612, 5893, 6304, 6759, 6761, 6762, 6763, 0604, 6390],
			"Dankort": [5019],
			"MasterCard": [50, 51, 52, 53, 54, 55],
			"Solo": [6334, 6767],
			"Switch": [4903, 4905, 4911, 4936, 564182, 633110, 6333, 6759],
			"Visa": [4],
			"Visa Electron": [4026, 417500, 4405, 4508, 4844, 4913, 4917]
		};
		$('input', this).keyup(function() {
			var a, b;
			number[$(this).index()] = $.trim($(this).val());
			if(number.join('').length == 16) {
				outer_loop:
				for(a in type) {
					for(b in type[a]) {
						if (number.join('').substring(0, type[a][b].toString().length) == type[a][b]) {
							type = a;
							break outer_loop;
						}
					}
				}
				if(!isNaN(number[0]) && luhn(number.join(''))) {
					$('.form-group', $this).removeClass('has-error').addClass('has-success');
					$('.alert', $this).removeClass('alert-danger').addClass('alert-success').text('Your card ' + (typeof type == 'string' ? type : '') + ' is valid.').show();
				}
				else {
					$('.form-group', $this).removeClass('has-success').addClass('has-error');
					$('.alert', $this).removeClass('alert-success').addClass('alert-danger').text('Your card ' + (typeof type == 'string' ? type : '') + ' is not valid.').show();
				}
			}
			else {
				$this.prev('.alert').hide();
			}
		});
	};
	$('#luhn').luhn();
});
