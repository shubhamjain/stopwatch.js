var stopwatch = {
	QUIT: 2,

	isContinuous: true, /* Does the command shows output continously or prints and exits */
	timeElapsed: 0,
	splitArr: null,
	splitDiff: 0,
	splits: 0,
	output: "",

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
		this.splitDiffArr = new Array();
		this.splitArr = new Array();

		this.output = "# \t Time Elapsed \t Split Difference\r\n";
		this.output += "-----------------------------------------\r\n";

		var contxt = this;
		setInterval( function(){
			contxt.timeElapsed += 10;
		}, 10);
	},

	keyAction: function( charCode )
	{
		if( charCode === 81 )
			return QUIT; //Send QUIT if "q" is pressed
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