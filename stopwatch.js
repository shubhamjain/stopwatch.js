var Stopwatch = {
	var timeElapsed;
	var splitArr;

	init: function(){
		this.timeElapsed = 0;
		this.splitArr = new Array();

		setInterval( function(){
			this.timeElapsed += 10;
		}, 10);
	},

	split: function(){
		this.splitArr.push( this.timeElapsed )
	}
}