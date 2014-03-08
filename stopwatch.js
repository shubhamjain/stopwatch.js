var stopwatch = {
	QUIT: 2, //constant to signal terminating running command.

	isContinuous: true, /* Does the command shows output continously or prints and exits */
	timeElapsed: 0,
	splitArr: null,
	splitDiff: 0,
	splits: 0,
	output: "",
	intervalId: null,

	toFormat: function( miliseconds )
	{
		formatArr = {
			"d": 24 * 60 * 60 * 1000,
			"h": 60 * 60 * 1000,
			"m": 60 * 1000,
			"s": 1000,
			"ms": 1
		}

		var timeStr = "";
		$.each( formatArr, function( index, val) {
			if( Math.floor(timeUnit = miliseconds / val) )
			{
				timeStr += Math.floor(timeUnit) + index + " "; 
				miliseconds = miliseconds % val;
			}
		});
		return timeStr;
	},

	init: function()
	{
		this.splitArr = new Array();
		this.timeElapsed = 0;
		this.splitDiff = 0;
		this.splits = 0;

		this.output = "Press q to exit and Spacebar to split.\r\n\r\n";
		this.output += "# \t Time Elapsed \t Split Difference\r\n";
		this.output += "-----------------------------------------\r\n";

		var contxt = this;
		this.intervalId = setInterval( function(){
			contxt.timeElapsed += 10;
		}, 10);
	},

	keyAction: function( charCode )
	{
		if( charCode === 113 )
			return this.QUIT; //Send QUIT if "q" is pressed
		else if ( charCode === 32 )
			this.split();
	},

	split: function()
	{
		this.splitArr.push( this.timeElapsed );
		this.splitDiff = this.timeElapsed - this.splitArr [this.splits - 1];
		this.splits++;

		this.updateOutput();
	},

	updateOutput: function()
	{	
		this.output += this.splits + " \t " + this.toFormat( this.splitArr[this.splits - 1] ) + "\t" + this.toFormat( this.splitDiff ) + "\r\n";
	},

	show: function()
	{
		return this.output + "\r\n" + this.toFormat( this.timeElapsed );
	}
}