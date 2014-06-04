(function() {
	
	var toBytes = function(params) {
		return parseInt(params.value) * parseInt(params.multiplier);
	};
	
	/**
	 * HHMMSS
	 */
	var formatTime = function(seconds) {
		var sec_num	= parseInt(seconds, 10),
			hours	= Math.floor(sec_num / 3600),
			minutes	= Math.floor((sec_num - (hours * 3600)) / 60),
			seconds	= sec_num - (hours * 3600) - (minutes * 60);
		if (hours < 10) {
			hours	= '0'+hours;
		}
		if (minutes < 10) {
			minutes	= '0'+minutes;
		}
		if (seconds < 10) {
			seconds	= '0'+seconds;
		}
		return !isNaN(hours+minutes+seconds) ? hours+':'+minutes+':'+seconds : '?';
	};
	
	var datarate = {};
	
	datarate.getDownloadTime = function(params) {
		var b = toBytes({
			"value": params.bitrate,
			"multiplier": params.bitrateMultiplier,
		}), f = toBytes({
			"value": params.filesize,
			"multiplier": params.filesizeMultiplier
		});
		return formatTime(f / b);
	};
	
	window.datarate = datarate;
	
})(window);
