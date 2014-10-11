(function() {
	window.luhn = function(number) {
		number = number.toString().replace(/[^0-9]+/g, '').split('') || [];
		var i = number.length-1, k = 1, n, sum = 0;
		for(; i >= 0; i--, k++) {
			n = parseInt(number[i]);
			if (k % 2 == 0) {
				n = 2 * n;
			}
			sum += (n > 9 ? n - 9 : n);
		}
		return sum % 10 == 0;
	};
})(window);
