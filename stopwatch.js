var stopwatch = {
	QUIT: 2,

	isContinuous: true, /* Does the command shows output continously or prints and exits */
	timeElapsed: 0,
	splitDiffArr: null,
	splits: 0,
	output: "",

	init: function()
	{
		this.splitDiffArr = new Array(0);

		this.output = "# \t\t Time Elapsed\t\tSplit Difference\n";
		this.output += "----------------------------------------";

		setInterval( function(){
			this.timeElapsed += 10;
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
		this.splitDiffArr.push( this.timeElapsed - this.splitDiffArr [this.splits])
		this.splits++;

		this.updateOutput();
	},

	updateOutput: function()
	{	
		this.output += this.splits + " \t\t " + this.toFormat( this.timeElapsed[this.splits] ) + "\t\t" + this.toFormat( this.splitArr[this.splits] ) + "\n";
	},

	show: function()
	{
		return this.output + "\n" + toFormat( this.timeElapsed );
	}
}