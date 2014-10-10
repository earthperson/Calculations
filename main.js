$(function() {
	$.fn.luhn = function() {
		var number = [], $this = this,
		iins = { // Issuer identification numbers http://en.wikipedia.org/wiki/Bank_card_number
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
			var a, b, l = 0, index = $(this).index(), iin = '';
			number[index] = $.trim($(this).val());
			if(number.join('').length % 4 === 0 && number.join('').length !== 16) {
				$('input').eq(index + 1).focus();
			}
			else if(number.join('').length == 16) {
				for(a in iins) {
					for(b in iins[a]) {
						if (number.join('').substring(0, iins[a][b].toString().length) == iins[a][b]) {
							if(l < iins[a][b].toString().length) {
								iin = a;
								l = iins[a][b].toString().length;
							}
						}
					}
				}
				if(!isNaN(number[0]) && luhn(number.join(''))) {
					$('.form-group', $this).removeClass('has-error').addClass('has-success');
					$('.alert', $this).removeClass('alert-danger').addClass('alert-success').text('Your card ' + iin + ' is valid.').show();
				}
				else {
					$('.form-group', $this).removeClass('has-success').addClass('has-error');
					$('.alert', $this).removeClass('alert-success').addClass('alert-danger').text('Your card ' + iin + ' is not valid.').show();
				}
			}
			else {
				$this.prev('.alert').hide();
			}
		});
	};
	
	$.fn.datarate = function () {
		var $this = this;
		$('button', this).click(function(e) {
			e.preventDefault();
			var time = datarate.getDownloadTime({
				"bitrate": $.trim($('#bitrate').val()),
				"bitrateMultiplier": $('#binary-prefix-bitrate').val(),
				"filesize": $.trim($('#filesize').val()),
				"filesizeMultiplier": $('#binary-prefix-filesize').val()
			});
			if(time != '?') {
				$('.alert', $this).removeClass('alert-danger').text('Download time (hh:mm:ss): '+time).show();
			}
			else {
				$('.alert', $this).removeClass('alert-danger').addClass('alert-danger').text('Out of range.').show();
			}
			
		});
	};
	
	$('#luhn').luhn();
	$('#datarate').datarate();
});
